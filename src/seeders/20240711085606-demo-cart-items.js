'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cart_items', [
      {
        quantity: 2,
        product_id: 1,  // Certifique-se de que o Product com ID 1 existe
        cart_id: 1,     // Certifique-se de que o Cart com ID 1 existe
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quantity: 4,
        product_id: 3,  // Certifique-se de que o Product com ID 2 existe
        cart_id: 1,     // Certifique-se de que o Cart com ID 1 existe
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quantity: 3,
        product_id: 3,  // Certifique-se de que o Product com ID 3 existe
        cart_id: 1,     // Certifique-se de que o Cart com ID 1 existe
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cart_items', null, {});
  }
};
