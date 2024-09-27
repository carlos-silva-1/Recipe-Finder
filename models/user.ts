'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import bcrypt from 'bcrypt';
import Recipe from './recipe';
import UserRecipe from './userRecipe';
import ExtendedUser from '../types/extendedUser';

class User extends Model {}

User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    ingredients: DataTypes.TEXT
  }, 
  { 
    sequelize, 
    modelName: 'User',
    hooks: {
      beforeCreate: async (user: ExtendedUser) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(user.password, salt); 
          user.password = hashedPassword;
        }
      },
      beforeUpdate: async (user: ExtendedUser) => {
        if (user.changed('password') && user.password) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(user.password, salt);
          user.password = hashedPassword;
        }
      },
    },
  }
);

User.belongsToMany(Recipe, { through: UserRecipe, as: 'recipes', foreignKey: 'userId' });
Recipe.belongsToMany(User, { through: UserRecipe, as: 'users', foreignKey: 'recipeId' });

export default User;
