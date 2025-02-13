const { DataTypes } = require('sequelize');
const sequelize = require('../conect'); // Importa a conexão com o banco

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.STRING,
    primaryKey: true,
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
