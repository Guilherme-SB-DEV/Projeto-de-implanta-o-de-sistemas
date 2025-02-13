const Usuario = require('../models/Usuario');

async function buscarUsuarioPorId(id) {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return { message: 'Usuário não encontrado' };
    }
    return usuario;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return { error: 'Erro ao buscar usuário' };
  }
}

module.exports = buscarUsuarioPorId;
