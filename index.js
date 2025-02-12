const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const checkToken = require("./services/checktoken");
const jwt = require("jsonwebtoken")
require("dotenv").config()
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
app.get('/main/:id', checkToken('id'), (req, res) => {

    const carros = [
        { cor: "Vermelho", placa: "ABC-1234", porte: "Pequeno" },
        { cor: "Azul", placa: "XYZ-5678", porte: "Médio" },
        { cor: "Preto", placa: "DEF-9101", porte: "Grande" },
        { cor: "Branco", placa: "GHI-1121", porte: "Pequeno" },
        { cor: "Prata", placa: "JKL-3141", porte: "Médio" },
    ];

    return res.render('main', { carros })
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


app.post('/login', async (req, res) => {

    const usr = { id: "666", login: 'gui', pass: 123 }
    const { username, password } = req.body;
    console.log(username, password, process.env.SECRET)
    if (username && password) {
        if (usr.login == username && usr.pass == password) {
            // Gerar token
            const secret = process.env.SECRET;
            const token = jwt.sign({ id: usr.id }, secret, { expiresIn: "1h" }); // Expira em 1 hora

            // Configurar cookie
            res.cookie("auth", token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
                secure: process.env.SECRET === "production",
            }); // 1 hora em milissegundos

            return res.redirect("/main/" + usr.id)
        }

    }
})



app.delete('/main/:id', checkToken("id"), (res, req) => {
    try {

    } catch (error) {

    }

})

app.listen(4000, () => {
    console.log('servidor rodando na porta 4000')
})