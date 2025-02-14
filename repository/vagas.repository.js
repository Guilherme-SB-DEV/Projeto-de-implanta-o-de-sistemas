const { where } = require("sequelize");
const Vagas = require("../models/vagas");

async function listarVagas() {
    try {
        const vagas = await Vagas.findAll();
        return vagas;
    } catch (error) {
        console.log(error);
    }

}
async function defineStatusVaga(id, status) {
    try {
        await Vagas.update({status_vaga: status}, {where:{id_vaga: id}})
    } catch (error) {
        console.log(error)
    }
}
module.exports = { listarVagas, defineStatusVaga}