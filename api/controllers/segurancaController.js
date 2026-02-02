const SegurancaService = require('../services/segurancaService')
const segurancaService = new SegurancaService()

// biome-ignore lint/complexity/noStaticOnlyClass: Class used as controller
class SegurancaController {
  static async cadastrarAcl() {
    const { roles, permissoes } = require.body
    const { usuarioId } = req

    try {
      const acl = await segurancaService.cadastrarAcl({ roles, permissoes, usuarioId })

      res.status(201).send(acl)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }
}

module.exports = SegurancaController
