'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('carts', [
      {

        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('carts', null, {});

  }
};
