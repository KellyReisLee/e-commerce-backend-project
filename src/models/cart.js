'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // Um carrinho pertence a um usuário
      Cart.belongsTo(models.User, {
        foreignKey: 'userId',  // Nome da chave estrangeira para o usuário

        onDelete: 'CASCADE'
      });

      // Um carrinho pode ter muitos produtos e um produto pode estar em muitos carrinhos
      Cart.belongsToMany(models.Product, {
        through: models.CartItem,
        foreignKey: 'cartId',
        otherKey: 'productId',
        onDelete: 'CASCADE'
      });
    }
  }

  Cart.init({
    userId: {
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
    modelName: 'Cart',
    tableName: 'carts'
  });

  return Cart;
};
