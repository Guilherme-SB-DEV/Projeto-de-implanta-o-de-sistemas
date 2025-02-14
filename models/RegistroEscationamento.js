const { DataTypes } = require('sequelize');
const sequelize = require('../conect');

const RegistroEstacionamento = sequelize.define('RegistroEstacionamento', {
  id_registro: {
    type: DataTypes.STRING,
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
  },
  hora_entrada:{
    type: DataTypes.STRING
  },
  FK_VEICULOS_id_veiculo:{
    type: DataTypes.STRING,

  },
  FK_VAGA_id_vaga:{
    type: DataTypes.STRING
  }
}, {
  tableName: 'REGISTRO_ESTACIONAMENTO',
  timestamps: false
});

module.exports = RegistroEstacionamento;
