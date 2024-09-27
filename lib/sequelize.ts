import { Sequelize } from 'sequelize';

const sequelize: Sequelize = new Sequelize({
  database: 'recipe_finder',
  username: 'recipe_user',
  password: '1234',
  host: 'localhost',
  dialect: 'mysql',
  dialectModule: require('mysql2'),
});

export default sequelize;
