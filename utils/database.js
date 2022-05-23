const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

//dotenv.config({ path: './set.env' });

// Create a connection to database
const database = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASS,
  database: process.env.DB,
  logging: false,
  dialectOptions:
    process.env.NODE_ENV === 'production'
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
});

module.exports = { database };
