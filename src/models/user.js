'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Um usuário pode ser o admin de muitos produtos
      User.hasMany(models.Product, {
        foreignKey: 'user_id',
        as: 'products',  // Alias para a associação
        onDelete: 'CASCADE'
      });

      User.hasMany(models.Order, {
        foreignKey: 'user_id',
        as: 'orders',  // Alias para a associação
        onDelete: 'CASCADE'
      });

      // Um usuário tem um carrinho
      User.hasOne(models.Cart, {
        foreignKey: 'user_id',
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
