class PermissaoService {
  async cadastrar(dto) {
    const permissao = await database.permissoes.findOne({
      where: {
        nome: dto.nome,
      },
    })

    if (permissao) {
      throw new Error('Permissão já cadastrada')
    }

    try {
      const newPermissao = await database.permissoes.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao,
      })

      return newPermissao
    } catch {
      throw new Error('Erro ao cadastrar permissão')
    }
  }
}

module.exports = PermissaoService
