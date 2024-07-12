'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {


    static associate(models) {
      // Um item de carrinho pertence a um produto
      OrderItem.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'orderProducts',  // Alias para a associação
        onDelete: 'CASCADE'
      });

      // Um item de carrinho pertence a um carrinho
      OrderItem.belongsTo(models.Order, {
        foreignKey: 'order_id',
        as: 'ordersOrder',  // Alias para a associação
        onDelete: 'CASCADE'
      });

    }
  }
  OrderItem.init({
    quantity: DataTypes.INTEGER,
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_items'
  });
  return OrderItem;
};