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

  async cadastrarPermissoesRoles(dto) {
    const role = await database.roles.findOne({
      include: [
        {
          model: database.permissoes,
          as: 'role_permissao',
          attributes: ['id', 'nome', 'descricao'],
        },
      ],
    })

    if (!role) {
      throw new Error('Role não cadastrada')
    }

    const permissoesCadastradas = await database.permissoes.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.permissoes,
        },
      },
    })

    await role.removeRole_permissao(role.role_permissao)

    await role.addRole_permissao(permissoesCadastradas)

    const novaRole = await database.roles.findOne({
      include: [
        {
          model: database.permissoes,
          as: 'role_permissao',
          attributes: ['id', 'nome', 'descricao'],
        },
      ],
      where: {
        id: dto.roleId,
      },
    })

    return novaRole
  }
}

module.exports = SegurancaService
