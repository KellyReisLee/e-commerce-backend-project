'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cart_items', [
      {
        quantity: 1,
        productId: 1,  // Certifique-se de que o Product com ID 1 existe
        cartId: 1,     // Certifique-se de que o Cart com ID 1 existe
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quantity: 2,
        productId: 2,  // Certifique-se de que o Product com ID 2 existe
        cartId: 1,     // Certifique-se de que o Cart com ID 1 existe
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quantity: 3,
        productId: 3,  // Certifique-se de que o Product com ID 3 existe
        cartId: 1,     // Certifique-se de que o Cart com ID 1 existe
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cart_items', null, {});
  }
};
