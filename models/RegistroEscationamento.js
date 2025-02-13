const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RegistroEstacionamento = sequelize.define('RegistroEstacionamento', {
  id_registro: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  data_entrada: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  data_saida: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  hora_saida: {
    type: DataTypes.TIME,
    allowNull: true
  }
}, {
  tableName: 'REGISTRO_ESTACIONAMENTO',
  timestamps: false
});

module.exports = RegistroEstacionamento;
