'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Um produto pertence a um usuário (admin)
      Product.belongsTo(models.User, {
        foreignKey: 'admin_id',
        as: 'admin',
        onDelete: 'CASCADE',
      });

      // Um produto pode estar em muitos carrinhos e um carrinho pode ter muitos produtos
      Product.belongsToMany(models.Cart, {
        through: models.CartItem,
        as: 'carts',
        foreignKey: 'product_id',
        otherKey: 'cart_id',
        onDelete: 'CASCADE',
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
  return Product;
}