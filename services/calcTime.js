const { Op } = require('sequelize');
const RegistroEstacionamento = require('../models/RegistroEstacionamento');

async function calcularTempoPermanencia(idRegistro) {
  try {
    const registro = await RegistroEstacionamento.findOne({
      where: { id_registro: idRegistro }
    });

    if (!registro) {
      return { message: 'Registro não encontrado' };
    }

    if (!registro.data_saida || !registro.hora_saida) {
      return { message: 'O veículo ainda está no estacionamento' };
    }

    const entrada = new Date(`${registro.data_entrada}T00:00:00`);
    const saida = new Date(`${registro.data_saida}T${registro.hora_saida}`);

    const diffMs = saida - entrada; // Diferença em milissegundos
    const horas = Math.floor(diffMs / (1000 * 60 * 60)); // Converte para horas
    const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // Converte para minutos

    return { tempo: `${horas} horas e ${minutos} minutos` };
  } catch (error) {
    console.error('Erro ao calcular tempo de permanência:', error);
    return { error: 'Erro ao calcular tempo de permanência' };
  }
}

module.exports = calcularTempoPermanencia;
