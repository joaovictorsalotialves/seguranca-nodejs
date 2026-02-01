const PermissaoService = require('../services/permissaoService')
const permissaoService = new PermissaoService()

// biome-ignore lint/complexity/noStaticOnlyClass: Class used as controller
class PermissaoController {
  static async cadastrar(req, res) {
    const { nome, descricao } = req.body

    try {
      const permissao = await permissaoService.cadastrar({ nome, descricao })

      res.status(201).send(permissao)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }
}

module.exports = PermissaoController
