/* eslint-disable no-undef */
require("dotenv").config();

const defaultConfig = {
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "acquacheck_db",
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
  dialect: "postgres",
  logging: false,
};

module.exports = {
  development: {
    ...defaultConfig,
  },

  production: {
    ...defaultConfig,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};