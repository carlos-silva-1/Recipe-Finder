'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10),
        ingredients: 'milk; sugar; chocolate; ',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        password: await bcrypt.hash('password123', 10),
        ingredients: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@example.com',
        password: await bcrypt.hash('password123', 10),
        ingredients: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob@example.com',
        password: await bcrypt.hash('password123', 10),
        ingredients: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Charlie',
        lastName: 'Davis',
        email: 'charlie@example.com',
        password: await bcrypt.hash('password123', 10),
        ingredients: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
