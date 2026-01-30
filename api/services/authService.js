const database = require('../models')
const { compare } = require('bcryptjs')
const { sing } = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret')

class AuthService {
  async login(dto) {
    const usuario = await database.usuarios.findOne({
      attributes: ['id', 'email', 'senha'],
      where: {
        email: dto.email,
      },
    })

    if (!usuario) {
      throw new Error('Usuário não cadastrado')
    }

    const senhaIguais = await compare(dto.senha, usuario.senha)

    if (!senhaIguais) {
      throw new Error('Usuário ou senha inválidos')
    }

    const accessToken = sing(
      {
        id: usuario.id,
        email: usuario.email,
      },
      jsonSecret.secret,
      {
        expiresIn: '1d',
      }
    )

    return { accessToken }
  }
}

module.exports = AuthService
