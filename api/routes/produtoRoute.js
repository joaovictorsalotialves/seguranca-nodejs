const { Router } = require('express')
const ProdutoController = require('../controllers/produtoController')
// const roles = require('../middlewares/role')
const permissoes = require('../middlewares/permissao')

const router = Router()

router
  .post('/produto', ProdutoController.cadastrarProduto)
  .get('/produto', permissoes(['Listar']), ProdutoController.buscarTodosProdutos)
  .get('/produto/id/:id', ProdutoController.buscarProdutoPorId)
  .delete('/produto/id/:id', ProdutoController.deletarProdutoPorId)
  .put('/produto/id/:id', ProdutoController.editarProduto)

module.exports = router
