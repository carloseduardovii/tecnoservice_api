const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './set.env' });
const credentials = {
  development: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASS,
    database: process.env.DB,
    logging: false,
  },
  production: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASS,
    database: process.env.DB,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
// Create a connection to database
let config = {};

if (process.env.NODE_ENV === 'development') config = credentials.development;
else config = credentials.production;

const database = new Sequelize(config);

module.exports = { database };
