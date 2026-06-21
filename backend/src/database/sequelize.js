import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST || 'localhost', // || 'db_acquacheck',
  dialect: 'postgres',
  port: process.env.POSTGRES_PORT || 5432,
  logging: false,
});

export default sequelize;