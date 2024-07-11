'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cart_items', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      cartId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'carts',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });

    // Adiciona índices para as chaves estrangeiras
    await queryInterface.addIndex('cart_items', ['productId']);
    await queryInterface.addIndex('cart_items', ['cartId']);

    // Adiciona um índice único para evitar duplicação de produto em um carrinho
    await queryInterface.addConstraint('cart_items', {
      fields: ['cartId', 'productId'],
      type: 'unique',
      name: 'unique_cart_product'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cart_items');
  }
};
