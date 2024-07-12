'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Um produto pertence a um usuário (admin)
      Product.belongsTo(models.User, {
        foreignKey: 'user_id',  // Nome da chave estrangeira no banco de dados
        as: 'admin',  // Alias para a associação
        onDelete: 'CASCADE'
      });

      // Um produto pode estar em muitos carrinhos e um carrinho pode ter muitos produtos
      Product.belongsToMany(models.Cart, {
        through: models.CartItem,
        foreignKey: 'product_id',
        otherKey: 'cart_id',
        as: 'carts',  // Alias para a associação
        onDelete: 'CASCADE'
      });


      // Product.belongsToMany(models.Order, {
      //   through: models.OrderItem,
      //   foreignKey: 'product_id',
      //   otherKey: 'order_id',
      //   as: 'prodOrders',  // Alias para a associação
      //   onDelete: 'CASCADE'
      // });
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
    modelName: 'Product',
    tableName: 'products'
  });

  return Product;
};
