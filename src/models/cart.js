'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // Um carrinho pertence a um usuário
      Cart.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      });

      // Um carrinho pode ter muitos produtos através de CartItem
      Cart.belongsToMany(models.Product, {
        through: models.CartItem,
        as: 'products',
        foreignKey: 'cart_id',
        otherKey: 'product_id',
        onDelete: 'CASCADE',
      });
    }
  }

  Cart.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
  });

  return Cart;
};
