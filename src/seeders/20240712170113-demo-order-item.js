'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('orderItems', [
      {
        quantity: 3,
        product_id: 1,  // Certifique-se de que o Product com ID 1 existe
        order_id: 1,     // Certifique-se de que o Cart com ID 1 existe
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quantity: 2,
        product_id: 2,  // Certifique-se de que o Product com ID 1 existe
        order_id: 1,     // Certifique-se de que o Cart com ID 1 existe
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('People', null, {});

  }
};
