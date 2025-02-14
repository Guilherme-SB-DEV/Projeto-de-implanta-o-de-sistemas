
const RegistroEstacionamento = require("./../models/RegistroEscationamento")

async function registrarEntrada(id_vaga, id_veiculo) {
    try {
        const novoRegistro = await RegistroEstacionamento.create({
            id_registro: Math.floor(Math.random()*100), // Gera um UUID para o registro
            data_entrada: new Date(),
            hora_entrada: new Date().toLocaleTimeString("pt-BR"),
            FK_VAGA_id_vaga:id_vaga,
            FK_VEICULOS_id_veiculo:id_veiculo,
        });

        console.log('Registro criado:', novoRegistro);
        return novoRegistro;
    } catch (error) {
        console.error('Erro ao registrar estacionamento:', error.message);
        throw error;
    }
}
async function listarRegistros(){
    try {
        const result = await RegistroEstacionamento.findAll()
        return result
    } catch (error) {
        console.log(error)
    }
}
async function findRegistro(id_vaga){
    try {
        const result = await RegistroEstacionamento.findOne({where:{FK_VAGA_id_vaga: id_vaga}})
        return result;
    } catch (error) {
        console.log(error)
    }
}

module.exports = { registrarEntrada, listarRegistros, findRegistro };