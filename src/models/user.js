'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Um usuário pode ser o admin de muitos produtos
      User.hasMany(models.Product, {
        foreignKey: 'userId',  // Nome da chave estrangeira, deve ser admin_id, não user_id
        as: 'products',  // Alias para a associação
        onDelete: 'CASCADE'
      });

      // Um usuário tem um carrinho
      User.hasOne(models.Cart, {
        foreignKey: 'userId',  // Nome da chave estrangeira para o usuário
        as: 'cart',  // Alias para a associação
        onDelete: 'CASCADE'
      });
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });

  return User;
};
