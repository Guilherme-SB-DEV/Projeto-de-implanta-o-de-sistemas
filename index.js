const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const checkToken = require("./services/checktoken");
const jwt = require("jsonwebtoken");
const { deletarVeiculo, listarVeiculos, inserirVeiculo } = require("./repository/carros.repository");
const { buscarUsuarioPorLogin, adicionarUsuario } = require("./repository/usr.repository");
require("dotenv").config()
const bcrypt = require("bcrypt");

const app = express();
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
    const id = req.params.id
    const carros = await listarVeiculos();
    return res.render('main', { carros, id });
})
app.get('/billing/:placa', async (req, res)=>{
    const placa = req.params.placa;
    
    const dadosNota = {
        data: new Date().toLocaleDateString(),
        placa,
        cor: "cor",
        porte: "porte"
    };

    const nomeArquivo = await gerarNotaFiscal(dadosNota);

    res.download(nomeArquivo, (err) => {
        if (err) console.error("Erro no download:", err);
    });
})
app.get('/register', (req, res)=>{
    return res.render('register');
})
app.post('/register', (req, res)=>{
    try {
        const {login, senha} = req.body;
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



app.delete('/main/:id/del/:idVeiculo', checkToken("id"), async (req, res) => {
    try {
        const idVeiculo = req.params.idVeiculo
        console.log(' ===========================')
        await deletarVeiculo(idVeiculo);
        return res.statusCode(200).send('veiculo deletado com sucesso')
    } catch (error) {
        console.log(error)
    }
    return res.redirect('/main/'+ req.param.id)
})
app.post('/main/:id', async (req, res)=>{
    try {
        const {cor, placa, modelo, porte} = req.body;
        await inserirVeiculo(placa, cor, modelo, porte);
    } catch (error) {
        console.log(error)
    }
    
})
app.listen(4000, () => {
    console.log('servidor rodando na porta 4000')
})