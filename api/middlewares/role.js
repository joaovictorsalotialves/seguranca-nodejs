const database = require('../models')

const roles = listaRoles => {
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
      res.status(401).send('Usuario não cadastrado')
    }

    const rolesCadastradas = usuario.usuario_role.map(role => role.nome).some(role => listaRoles.include(role))

    if (!rolesCadastradas) {
      res.status(401).send('Usuario não possui acesso a essa rota')
    }

    return next()
  }
}

module.exports = roles
