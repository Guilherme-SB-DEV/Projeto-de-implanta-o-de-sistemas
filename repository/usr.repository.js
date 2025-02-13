const uuid = require('uuid');
const Usuario = require('../models/usr');
const bcrypt = require("bcrypt");

async function buscarUsuarioPorLogin(login) {
  try {
    const usuario = await Usuario.findOne({where:{login: login}});
    if (!usuario) {
      return { message: 'Usuário não encontrado' };
    }
    console.log('busca efetuada');
    return usuario;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return { error: 'Erro ao buscar usuário' };
  }
}


async function adicionarUsuario(login, senha) {
    try {
        var id = uuid.v4()
        console.log(id)
        // Verifica se o usuário já existe
        const usuarioExistente = await Usuario.findOne({ where: { login } });
        if (usuarioExistente) {
            return { erro: "Usuário já existe!" };
        }

        // Gera um hash seguro para a senha antes de salvar no banco
        const senhaHash = await bcrypt.hash(senha, 10);

        // Cria o usuário no banco
        const novoUsuario = await Usuario.create({id_usuario: id, login, senha: senhaHash });

        return { sucesso: "Usuário cadastrado com sucesso!", usuario: novoUsuario };
    } catch (error) {
        console.error("Erro ao adicionar usuário:", error);
        return { erro: "Erro ao cadastrar usuário" };
    }
}



module.exports ={buscarUsuarioPorLogin, adicionarUsuario};
