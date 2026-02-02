const database = require('../models')

const permissoes = listaPermissoes => {
  return async (req, res, next) => {
    const { usuarioId } = req

    const usuario = await database.usuarios.findOne({
      include: [
        {
          model: database.permissoes,
          as: 'usuario_permissao',
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

    const permissaoCadastrada = usuario.usuario_permissao
      .map(permissao => permissao.nome)
      .some(permissao => listaPermissoes.includes(permissao))

    if (!permissaoCadastrada) {
      return res.status(401).send('Usuario não possui acesso a essa rota')
    }

    return next()
  }
}

module.exports = permissoes
