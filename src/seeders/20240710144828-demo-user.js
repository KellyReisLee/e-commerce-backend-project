'use strict';

const { create } = require('handlebars');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'john_doe@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Joana Banana',
        email: 'joana@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ana Pereira',
        email: 'ana@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
