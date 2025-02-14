const jwt = require("jsonwebtoken");
require("dotenv").config()
function checkToken(modo) {
  return function (req, res, next) {
    try {
      const token = req.cookies["auth"]
      const secret = process.env.SECRET
      console.log("Token recebido: " + JSON.stringify(token));

      if (!token) {
        return res.status(401).send("Acesso negado");
      }

      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          console.error("Erro ao verificar o token:", err);
          return res.status(401).send("Token inválido");
        }

        req.usr = decoded;

        if (modo === "id") {
          // Pegando o ID corretamente de req.params.id
          const idFromUrl = req.params.id;
          console.log(decoded)
          console.log("ID do token:", req.usr.id);
          console.log("ID da URL:", idFromUrl);

          if (String(req.usr.id) !== String(idFromUrl)) {
            return res
              .status(403)
              .send("Acesso negado(id): usuário não autorizado");
          }
        }
        next(); // Token válido e autorização confirmada
      });
    } catch (error) {
      console.error("Erro ao verificar o token:", error);
      res.status(401).send("Token inválido");
    }
  };
}

module.exports = checkToken;