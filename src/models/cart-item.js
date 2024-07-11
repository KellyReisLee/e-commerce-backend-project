'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      // Um item de carrinho pertence a um produto
      CartItem.belongsTo(models.Product, {
        foreignKey: 'productId',  // Nomes das colunas em camelCase
        as: 'product',
        onDelete: 'CASCADE',
      });

      // Um item de carrinho pertence a um carrinho
      CartItem.belongsTo(models.Cart, {
        foreignKey: 'cartId',
        as: 'cart',
        onDelete: 'CASCADE',
      });
    }
  }

  CartItem.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,  // Definindo um valor padrão para quantity
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carts',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'CartItem',
    tableName: 'cart_items',
  });

  return CartItem;
};
