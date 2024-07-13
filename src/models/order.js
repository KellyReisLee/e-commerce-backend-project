'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {

    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'user_id',  // Nome da chave estrangeira no banco de dados
        as: 'user',  // Alias para a associação
        onDelete: 'CASCADE'
      });

      // Um pedido pode ter muitos produtos e um produto pode estar em muitos pedidos
      Order.belongsToMany(models.Product, {
        through: models.OrderItem,
        foreignKey: 'order_id',
        otherKey: 'product_id',
        as: 'products',  // Alias para a associação
        onDelete: 'CASCADE'
      });
    }
  }
  Order.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {  // Coluna no banco de dados
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders'
  });
  return Order;
};