'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {

    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'user_id',  // Nome da chave estrangeira no banco de dados
        as: 'userOrder',  // Alias para a associação
        onDelete: 'CASCADE'
      });

      // Um carrinho pode ter muitos produtos e um produto pode estar em muitos carrinhos
      Order.belongsToMany(models.Product, {
        through: models.OrderItem,
        foreignKey: 'order_id',
        otherKey: 'product_id',
        as: 'orderProduct',  // Alias para a associação
        onDelete: 'CASCADE'
      });
    }
  }
  Order.init({
    id: DataTypes.INTEGER,
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