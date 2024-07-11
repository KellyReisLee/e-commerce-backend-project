'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Um produto pertence a um usuário (admin)
      Product.belongsTo(models.User, {
        foreignKey: 'admin_id',
        as: 'adminId',
        onDelete: 'CASCADE',
      });

      // Um produto pode estar em muitos carrinhos e um carrinho pode ter muitos produtos
      Product.belongsToMany(models.Cart, {
        through: models.CartItem,
        as: 'carts',
        foreignKey: 'product_id',
        otherKey: 'cart_id',
        as: 'carts'
      });
    }
  }

  Product.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin_id
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products'
  });
}