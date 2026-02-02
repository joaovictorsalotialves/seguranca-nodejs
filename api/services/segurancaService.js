const database = require('../models')

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
          as: 'usuario_permissoes',
          attributes: ['id', 'nome', 'descricao'],
        },
      ],
      where: {
        id: dto.usuarioId,
      },
    })
  }
}

module.exports = SegurancaService
