import { Sequelize } from 'sequelize';

const sequelize: Sequelize = new Sequelize('mysql://avnadmin:AVNS_ER9iJCrMooyfz2CJO-Q@mysql-39875044-carlos-83d8.i.aivencloud.com:20230/defaultdb?ssl-mode=REQUIRED', {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false 
    }
  }
});

export default sequelize;
