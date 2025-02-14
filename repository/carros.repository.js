const Veiculo = require('../models/carros');
const uuid = require('uuid')
// Função para inserir um novo veículo
async function inserirVeiculo(placa, cor, modelo, porte) {
    try {
        const id = uuid.v4();
        const veiculo = await Veiculo.create({ id_veiculo: id, placa, cor, modelo, porte });
        return veiculo;
    } catch (error) {
        console.error('Erro ao inserir veículo:', error);
        throw error;
    }
};

// Função para deletar um veículo
async function deletarVeiculo(idVeiculo) {
    try {
        console.log('deletando')
        await Veiculo.destroy({
            where: { id_veiculo: idVeiculo }
        });
    } catch (error) {
        console.error('Erro ao deletar veículo:', error);
        throw error;
    }
};

async function listarVeiculos() {
    try {
        const result = await Veiculo.findAll()
        return result;
    } catch (error) {
        console.log(error);
        
    }
}
async function buscarVeiculo(placa){
    try {
        const veiculo  = await Veiculo.findOne({where:{placa: placa}})
        console.log('VEICULO: '+ veiculo)
        return veiculo
    } catch (error) {
        console.log(error);
    }
}
module.exports = { inserirVeiculo, deletarVeiculo, listarVeiculos, buscarVeiculo };
