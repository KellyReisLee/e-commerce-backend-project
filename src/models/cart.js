'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // Um carrinho pertence a um usuário
      Cart.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',  // Alias para a associação
        onDelete: 'CASCADE'
      });

      // Um carrinho pode ter muitos produtos e um produto pode estar em muitos carrinhos
      Cart.belongsToMany(models.Product, {
        through: models.CartItem,
        foreignKey: 'cart_id',
        otherKey: 'product_id',
        as: 'products',  // Alias para a associação
        onDelete: 'CASCADE'
      });
    }
  }

  Cart.init({
    user_id: {
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
