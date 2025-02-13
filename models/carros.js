const { DataTypes } = require('sequelize');
const sequelize = require('./../conect');

const Veiculo = sequelize.define('Veiculo', {
    id_veiculo: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    porte:{
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    tableName: 'VEICULOS',
    timestamps: false,
});

module.exports = Veiculo;