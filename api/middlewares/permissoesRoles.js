const database = require('../models')
const Sequelize = require('sequelize')

const permissoesRoles = listaPermissoes => {
  return async (req, res, next) => {
    const { usuarioId } = req

    const usuario = await database.usuarios.findOne({
      include: [
        {
          model: database.roles,
          as: 'usuario_role',
          attributes: ['id', 'nome'],
        },
      ],
      where: {
        id: usuarioId,
      },
    })

    if (!usuario) {
      return res.status(401).send('Usuario não cadastrado')
    }

    let listaRolesId = []

    listaRolesId = Object.values(usuario.usuario_role).map(role => role.id)

    if (listaRolesId.length === 0) {
      return res.status(401).send('Usuario não possui acesso a essa rota')
    }

    const roles = await database.roles.findAll({
      include: [
        {
          model: database.permissoes,
          as: 'role_permissao',
          attributes: ['id', 'nome'],
        },
      ],
      where: {
        id: {
          [Sequelize.Op.in]: listaRolesId,
        },
      },
    })

    let possuiPermissao = false

    possuiPermissao = roles.some(role =>
      role.role_permissao.some(permissao => listaPermissoes.includes(permissao.nome))
    )

    if (!possuiPermissao) {
      return res.status(401).send('Usuario não tem acesso a essa rota')
    }

    return next()
  }
}

module.exports = permissoesRoles
