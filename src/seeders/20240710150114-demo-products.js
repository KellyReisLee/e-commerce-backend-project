'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('products',
      [
        {
          title: 'Book 1',
          imageUrl: 'https://www.freepik.com/free-ai-image/person-with-books-digital-art-style-education-day_133784877.htm#fromView=search&page=1&position=10&uuid=7231121c-5642-40ba-9541-df7490b3e98d',
          price: 45.29,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida neque convallis a cras semper.',
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Book 2',
          imageUrl: 'https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149322346.jpg?w=1380&t=st=1718979873~exp=1718980473~hmac=ff595f412142365a19fa6827e5a466e1bcbeb6be9732fb5ca2212e8dc89ef8c3',
          price: 26.89,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet sed euismod nisi porta.',
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Book 3',
          imageUrl: 'https://img.freepik.com/free-vector/hand-drawn-flat-design-bookmark-template_23-2149334868.jpg?t=st=1718891142~exp=1718894742~hmac=4beb74d28cf014825ef6d139c8dc0af3581e5572a62ae29da79896b8a38d4670&w=740',
          price: 38.10,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet sed euismod nisi porta.',
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }

      ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('products', null, {});

  }
};
