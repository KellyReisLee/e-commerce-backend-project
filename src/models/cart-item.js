'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      // Um item de carrinho pertence a um produto
      CartItem.belongsTo(models.Product, {
        foreignKey: 'productId',  // Nome da chave estrangeira para o produto

        onDelete: 'CASCADE'
      });

      // Um item de carrinho pertence a um carrinho
      CartItem.belongsTo(models.Cart, {
        foreignKey: 'cartId',  // Nome da chave estrangeira para o carrinho

        onDelete: 'CASCADE'
      });
    }
  }

  CartItem.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carts',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'CartItem',
    tableName: 'cart_items'
  });

  return CartItem;
};
