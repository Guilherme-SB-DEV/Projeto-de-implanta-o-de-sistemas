const { Sequelize, DataTypes } = require('sequelize');

require("dotenv").config()
// Configuração da conexão com o banco de dados
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql'
});


sequelize.sync({force:false})
.then(() => console.log('Banco de dados sincronizado'))
.catch(err => console.error('Erro ao sincronizar o banco de dados:', err.stack))


module.exports = sequelize;