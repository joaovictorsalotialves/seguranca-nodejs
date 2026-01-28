const { Router } = require('express')

const router = Router()

router.post('/usuarios').get('/usuarios').get('/usuarios/:id').put('/usuarios/:id').delete('/usuarios/:id')

module.exports = router
