const AuthService = require('../services/authService')

const authService = new AuthService()

// biome-ignore lint/complexity/noStaticOnlyClass: Class used as controller
class AuthController {
  static async login(req, res) {
    const { email, senha } = req.body

    try {
      const login = await authService.login({ email, senha })

      res.status(200).send(login)
    } catch (error) {
      res.status(401).send({ message: error.message })
    }
  }
}

module.exports = AuthController
