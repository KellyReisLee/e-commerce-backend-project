'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      // Um item de carrinho pertence a um produto
      CartItem.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',
        onDelete: 'CASCADE',
      });

      // Um item de carrinho pertence a um carrinho
      CartItem.belongsTo(models.Cart, {
        foreignKey: 'cart_id',
        as: 'cart',
        onDelete: 'CASCADE',
      });
    }
  }

  CartItem.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    cart_id: {
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
