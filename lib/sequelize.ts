import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize: Sequelize = new Sequelize(`mysql://avnadmin:${process.env.DB_PASSWORD}@mysql-39875044-carlos-83d8.i.aivencloud.com:20230/defaultdb?ssl-mode=REQUIRED`, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

export default sequelize;
