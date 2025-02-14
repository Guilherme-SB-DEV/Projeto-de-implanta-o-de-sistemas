const { Op } = require('sequelize');
const RegistroEstacionamento = require('../models/RegistroEscationamento');

async function calcularTempoPermanencia(idRegistro, porte) {
  try {
    const registro = await RegistroEstacionamento.findOne({
      where: { id_registro: idRegistro }
    });

    if (!registro) {
      return { message: 'Registro não encontrado' };
    }

    // Converter a data de entrada para um objeto Date
    const entrada = new Date(registro.data_entrada); // Considera a data do banco diretamente como um objeto Date

    // Usar o Date.now() para pegar o timestamp atual, que é a forma correta de obter o horário atual em milissegundos
    const saida = new Date(); // Agora é um objeto Date com a data e hora atuais

    // Calcular a diferença entre as duas datas
    const diffMs = saida - entrada; // Diferença em milissegundos

    // Calcular horas e minutos
    const horas = Math.floor(diffMs / (1000 * 60 * 60)); // Converte para horas
    const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // Converte para minutos

    var acrescimo;
    // Ajustar o valor de acrescimo com base no porte do veículo
    if(porte === 'leve'){
      acrescimo = 1;
    }else if(porte === 'medio'){
      acrescimo = 110 / 100;
    }else{
      acrescimo = 120 / 100;
    }
    
    // Calcular o total com base no tempo e no porte
    const total = horas * acrescimo * 10; // Exemplo de cálculo com acrescimo
    console.log('Tempo total: ', total); // Imprimir o total para verificação

    return { total, horas, minutos };
  } catch (error) {
    console.error('Erro ao calcular tempo de permanência:', error);
    return { error: 'Erro ao calcular tempo de permanência' };
  }
}

module.exports = calcularTempoPermanencia;
