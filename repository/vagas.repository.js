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
        const vaga = await Vagas.findByPk(id);
        vaga.status = status
        vaga.save();
    } catch (error) {
        console.log(error)
    }
}
module.exports = { listarVagas, defineStatusVaga}