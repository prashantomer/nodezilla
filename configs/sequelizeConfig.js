const envFile = `.env.${process.env.NODE_ENV || "development"}`;
require("dotenv").config({ path: envFile }); 

const hash = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: `${process.env.DB_NAME}_${process.env.NODE_ENV || 'development'}`,
  host: process.env.DB_HOST,
  dialect: 'mysql'
}

module.exports = {
  development: hash,
  production: hash,
  test: hash
};
// Note: The above configuration assumes that the environment variables are set correctly in your .env file.