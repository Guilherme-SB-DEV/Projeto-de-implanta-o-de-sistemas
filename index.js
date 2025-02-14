const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require('cors')
const fs = require('fs');
const path = require("path");
const checkToken = require("./services/checktoken");
const jwt = require("jsonwebtoken");
const { deletarVeiculo, listarVeiculos, inserirVeiculo, buscarVeiculo, buscarVeiculoId } = require("./repository/carros.repository");
const { buscarUsuarioPorLogin, adicionarUsuario } = require("./repository/usr.repository");
require("dotenv").config()
const bcrypt = require("bcrypt");
const { listarVagas, defineStatusVaga } = require("./repository/vagas.repository");
const { registrarEntrada, listarRegistros, findRegistro, findRegistroId, delReg } = require("./repository/registro.repository");
const calcularTempoPermanencia = require("./services/calcCusto");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:4000", // Ajuste conforme necessário
    credentials: true // IMPORTANTE: Permite envio de cookies
}));
app.set("view engine", "ejs");
app.use(cookieParser());
app.set("views", path.join(__dirname, "/templates"));
app.use(bodyParser.json());
// Middleware para parsear JSON
app.use(express.json());

// Middleware para parsear dados de formulários
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    return res.redirect('/login')
})
app.get('/login', (req, res) => {
    return res.render("login")
});
app.get('/main/:id', checkToken('id'), async (req, res) => {
    try {
        const id = req.params.id;
        const carros = await listarVeiculos();
        const vagas = await listarVagas();
        const registros = await listarRegistros(); // Supondo que essa função retorne todos os registros
        console.log(vagas)
        let ocupados = [];

        for (let vaga of vagas) {
            const registro = await findRegistro(vaga.id_vaga); // Certifique-se de que essa função retorna o registro correto
            if (registro) {
                const carro = await buscarVeiculo(registro.FK_VEICULOS_id_veiculo);
                console.log(carro)
                if (carro) {
                    await defineStatusVaga(vaga.id_vaga, 'Ocupada')
                    ocupados.push({ id_vaga: vaga.id_vaga, placa: carro.placa, data: registro.data_entrada, inicio: registro.hora_entrada, id: registro.id_registro });
                }

            }
        }
        console.log(ocupados)
        return res.render('main', { carros, id, vagas, ocupados, registros });
    } catch (error) {
        console.error("Erro ao carregar página principal:", error);
        return res.status(500).send("Erro interno no servidor");
    }
});

app.get('/pay/:id', async (req, res) => {
    const id = req.params.id;
    const reg = await findRegistroId(id)
    console.log('--------------------------' + JSON.stringify(reg))
    const carro = await buscarVeiculo(reg.FK_VEICULOS_id_veiculo)
    console.log(carro)
    const calculo = await calcularTempoPermanencia(id, carro.porte)


    const dadosTicket = {
        id: id,
        placa: carro.placa,
        modelo: carro.modelo,
        porte: carro.porte,
        tempo: calculo.horas,
        total: calculo.total,
        vaga: reg.FK_VAGA_id_vaga,
    };

    // Formata o conteúdo do ticket
    const conteudo = `🚗 Ticket de Estacionamento 🚗\n
                        ID: ${dadosTicket.id}
                        Placa: ${dadosTicket.placa}
                        Modelo: ${dadosTicket.modelo}
                        Porte: ${dadosTicket.porte}
                        Tempo de permanência: ${dadosTicket.tempo}
                        Vaga: ${dadosTicket.vaga}
                        Total: R$${dadosTicket.total}
                        Chave pix: f25800c7-735f-45dc-a4dd-24abf4241870 
                        Obrigado por usar nosso estacionamento!`;

    // Caminho para salvar o arquivo
    const caminhoArquivo = path.join(__dirname, 'ticket.txt');
    
    await delReg(id)
    await defineStatusVaga(reg.FK_VAGA_id_vaga, "Disponível");
    // Cria o arquivo .txt no servidor
    fs.writeFile(caminhoArquivo, conteudo, (err) => {
        if (err) {
            return res.status(500).send('Erro ao criar o ticket.');
        }

        // Envia o arquivo como resposta para download
        res.download(caminhoArquivo, 'ticket.txt', (err) => {
            if (err) {
                console.log('Erro no envio do arquivo:', err);
            } else {
                console.log('Arquivo enviado com sucesso!');
            }

            // Apaga o arquivo após o download (se necessário)
            fs.unlink(caminhoArquivo, (err) => {
                if (err) {
                    console.log('Erro ao apagar o arquivo:', err);
                } else {
                    console.log('Arquivo apagado após o download.');
                }
            });
        });
    });

})



app.get('/register', (req, res) => {
    return res.render('register');
})
app.post('/register', (req, res) => {
    try {
        const { login, senha } = req.body;
        adicionarUsuario(login, senha);
        return res.redirect('/login');
    } catch (error) {
        console.log(error)
        return res.redirect('/cadastro')
    }

})

app.post('/login', async (req, res) => {

    const { login, password } = req.body;
    const usr = await buscarUsuarioPorLogin(login)
    if (usr) {
        console.log('passou pelo primeiro if')
        if (usr.login === login && bcrypt.compare(usr.senha, password)) {
            console.log('passou pelo segundo if')
            // Gerar token
            const secret = process.env.SECRET;
            console.log(usr.id_usuario)
            const token = jwt.sign({ id: usr.id_usuario }, secret, { expiresIn: "1h" }); // Expira em 1 hora
            // Configurar cookie
            res.cookie("auth", token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
                secure: process.env.SECRET === "production",
            }); // 1 hora em milissegundos

            return res.redirect("/main/" + usr.id_usuario)
        }

    }
})

app.post('/registerVaga', async (req, res) => {
    try {
        const { id, id_vaga, id_veiculo } = req.body;
        console.log(req.cookies)
        console.log('REGISTERVAGA -----------------------------------------------------')
        await registrarEntrada(id_vaga, id_veiculo)
        await defineStatusVaga(id_vaga, "ocupada");
        return res.redirect('/main/' + id);
    } catch (error) {
        console.log(error)
    }
})

app.delete('/main/:id/del/:idVeiculo', checkToken("id"), async (req, res) => {
    try {
        const idVeiculo = req.params.idVeiculo
        console.log(' ===========================')
        await deletarVeiculo(idVeiculo);
        return res.redirect('/main/' + req.param.id)
    } catch (error) {
        console.log(error)
    }
})
app.get('/main/:id/del/:idVeiculo', checkToken("id"), (req, res) => {
    return res.render('delCar');
})


app.post('/main/:id', async (req, res) => {
    try {
        const { cor, placa, modelo, porte } = req.body;
        console.log(cor, placa, modelo, porte)
        await inserirVeiculo(placa, cor, modelo, porte);
    } catch (error) {
        console.log(error)
    }

})
app.listen(4000, () => {
    console.log('servidor rodando na porta 4000')
})