'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';

class UserRecipe extends Model {}

UserRecipe.init({
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  recipeId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Recipes',
      key: 'recipeId',
    },
  },
}, { sequelize, modelName: 'UserRecipe' });

export default UserRecipe;