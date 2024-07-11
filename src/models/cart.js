'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // Um carrinho pertence a um usuário
      Cart.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'userId',
        onDelete: 'CASCADE',
      });

      // Um carrinho pode ter muitos produtos através de CartItem
      Cart.hasMany(models.Product, {
        through: models.CartItem,
        as: 'products',
        foreignKey: 'cartId',
        otherKey: 'productId',
        as: 'products',
        onDelete: 'CASCADE',
      });

    }
  }

  Cart.init({


  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
  });

  return Cart;
};
