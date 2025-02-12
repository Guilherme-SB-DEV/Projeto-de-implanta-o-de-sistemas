const Veiculo = require('../models/Veiculo');

// Função para inserir um novo veículo
const inserirVeiculo = async (placa, cor, modelo) => {
    try {
        const veiculo = await Veiculo.create({ placa, cor, modelo });
        return veiculo;
    } catch (error) {
        console.error('Erro ao inserir veículo:', error);
        throw error;
    }
};

// Função para deletar um veículo
const deletarVeiculo = async (idVeiculo) => {
    try {
        const result = await Veiculo.destroy({
            where: { id_veiculo: idVeiculo }
        });
        if (result === 0) {
            throw new Error('Veículo não encontrado');
        }
        return result;
    } catch (error) {
        console.error('Erro ao deletar veículo:', error);
        throw error;
    }
};

module.exports = { inserirVeiculo, deletarVeiculo };
