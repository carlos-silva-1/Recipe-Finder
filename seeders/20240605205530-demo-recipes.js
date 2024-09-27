'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Recipes', [
      {
        title: 'Recipe 1',
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Recipe 2',
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Recipe 3',
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Recipe 4',
        recipeId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Recipe 5',
        recipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Recipes', null, {});
  }
};
