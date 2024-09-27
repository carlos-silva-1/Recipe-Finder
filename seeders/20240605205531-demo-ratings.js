'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ratings', [
      { userId: 2, recipeId: 1, rating: 5, comment: 'Great recipe!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, recipeId: 2, rating: 4, comment: 'Really good!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, recipeId: 3, rating: 3, comment: 'It was okay.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, recipeId: 4, rating: 4, comment: 'Liked it!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, recipeId: 5, rating: 5, comment: 'Excellent!', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ratings', null, {});
  }
};
