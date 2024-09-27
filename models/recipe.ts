'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';

class Recipe extends Model {}

Recipe.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true
    }
  }, 
  {
    sequelize,
    modelName: 'Recipe',
  }
);

export default Recipe;
