'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import User from './user';
import Recipe from './recipe';

class Rating extends Model {}

Rating.init({
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Recipes',
        key: 'recipeId',
      },
    }
  }, 
  {
    sequelize,
    modelName: 'Rating',
  }
);

User.hasMany(Rating, { foreignKey: 'userId', as: 'ratings' });
Rating.belongsTo(User, { foreignKey: 'userId' });

Recipe.hasMany(Rating, { foreignKey: 'recipeId', as: 'ratings' });
Rating.belongsTo(Recipe, { foreignKey: 'recipeId' });

export default Rating;
