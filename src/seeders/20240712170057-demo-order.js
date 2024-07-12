'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('orders', [
      {
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('orders', null, {});

  }
};
