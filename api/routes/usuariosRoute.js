const { Router } = require('express')
const UsuarioController = require('../controllers/usuarioController')

const router = Router()

router
  .post('/usuarios', UsuarioController.cadastrar)
  .get('/usuarios')
  .get('/usuarios/:id')
  .put('/usuarios/:id')
  .delete('/usuarios/:id')

module.exports = router
