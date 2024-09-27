'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserRecipes', [
      // User 1
      { userId: 1, recipeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, recipeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, recipeId: 3, createdAt: new Date(), updatedAt: new Date() },
      // User 2
      { userId: 2, recipeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, recipeId: 3, createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, recipeId: 4, createdAt: new Date(), updatedAt: new Date() },
      // User 3
      { userId: 3, recipeId: 3, createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, recipeId: 4, createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, recipeId: 5, createdAt: new Date(), updatedAt: new Date() },
      // User 4
      { userId: 4, recipeId: 4, createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, recipeId: 5, createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, recipeId: 1, createdAt: new Date(), updatedAt: new Date() },
      // User 5
      { userId: 5, recipeId: 5, createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, recipeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, recipeId: 2, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserRecipes', null, {});
  }
};