const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa a conexão com o banco

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'USUARIO',
  timestamps: false
});

module.exports = Usuario;
