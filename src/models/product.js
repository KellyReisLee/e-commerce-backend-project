'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Um produto pertence a um usuário (admin)
      Product.belongsTo(models.User, {
        foreignKey: 'userId',  // Nome da chave estrangeira no banco de dados
        // as: 'userId',  // Nome da associação para evitar o conflito
        onDelete: 'CASCADE'
      });

      // Um produto pode estar em muitos carrinhos e um carrinho pode ter muitos produtos
      Product.belongsToMany(models.Cart, {
        through: models.CartItem,
        foreignKey: 'productId',
        otherKey: 'cartId',
        onDelete: 'CASCADE'
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
    userId: {  // Coluna no banco de dados
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
    modelName: 'Product',
    tableName: 'products'
  });

  return Product;
};
