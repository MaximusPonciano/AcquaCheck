import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.DB_HOST || 'localhost', // Dinâmico para Docker
  dialect: 'postgres',
  port: process.env.DB_PORT || 5432,        // Dinâmico para Docker
  logging: false,
});

export default sequelize;