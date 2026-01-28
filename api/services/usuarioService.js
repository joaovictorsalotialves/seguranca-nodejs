const database = require('../models')

class UsuarioService {
  async cadastrar(dto) {
    const usuario = await database.Usuarios.findOne({
      where: { email: dto.email },
    })

    if (usuario) {
      throw new Error('Usuário ja cadastrado')
    }
  }
}

module.exports = UsuarioService
