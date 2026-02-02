const database = require('../models')
const Sequelize = require('sequelize')

class SegurancaService {
  async cadastrarAcl(dto) {
    const usuario = await database.usuarios.findOne({
      include: [
        {
          model: database.roles,
          as: 'usuario_role',
          attributes: ['id', 'nome', 'descricao'],
        },
        {
          model: database.permissoes,
          as: 'usuario_permissao',
          attributes: ['id', 'nome', 'descricao'],
        },
      ],
      where: {
        id: dto.usuarioId,
      },
    })

    if (!usuario) {
      throw new Error('Usuario não cadastrado')
    }

    const rolesCadastradas = await database.roles.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.roles,
        },
      },
    })

    const permissoesCadastradas = await database.permissoes.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.permissoes,
        },
      },
    })

    await usuario.removeUsuario_role(usuario.usuario_role)
    await usuario.removeUsuario_permissao(usuario.usuario_permissao)

    await usuario.addUsuario_role(rolesCadastradas)
    await usuario.addUsuario_permissao(permissoesCadastradas)

    const novoUsuario = await database.usuarios.findOne({
      include: [
        {
          model: database.roles,
          as: 'usuario_role',
          attributes: ['id', 'nome', 'descricao'],
        },
        {
          model: database.permissoes,
          as: 'usuario_permissao',
          attributes: ['id', 'nome', 'descricao'],
        },
      ],
    })

    return novoUsuario
  }
}

module.exports = SegurancaService
