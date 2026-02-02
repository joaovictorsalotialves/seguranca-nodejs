const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class permissoes extends Model {
    static associate(models) {
      permissoes.belongsToMany(models.usuarios, {
        through: models.usuarios_permissoes,
        as: 'permissao_usuario',
        foreignKey: 'permissao_id',
      })
      permissoes.belongsToMany(models.roles, {
        through: models.roles_permissoes,
        as: 'permissao_role',
        foreignKey: 'permissao_id',
      })
    }
  }
  permissoes.init(
    {
      nome: DataTypes.STRING,
      descricao: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'permissoes',
    }
  )
  return permissoes
}
