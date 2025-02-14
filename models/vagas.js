const { DataTypes } = require('sequelize');
const sequelize = require('../conect');

const Vagas = sequelize.define('Vaga', {
    id_vaga: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
    },
    status_vaga: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'VAGA',
    timestamps: false,
});

module.exports = Vagas;
