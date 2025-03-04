require("dotenv").config();
const {DB_NAME,DB_PASSWORD,DB_USER,MYSQL_HOST,DIALECT,DB_PORT} = require("../variables")
module.exports = {
    development: {
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      host: MYSQL_HOST,
      port: DB_PORT,
      dialect: DIALECT,
    },
    test: {
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      host: MYSQL_HOST,
      port: DB_PORT,
      dialect: DIALECT,
    },
    production: {
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      host: MYSQL_HOST,
      port: DB_PORT,
      dialect: DIALECT,
    },
  };
