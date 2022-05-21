require('dotenv').config();
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
};

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error('no jwt secret found in .env');

const PORT = process.env.PORT || 3001;

module.exports = { PORT, dbConfig, jwtSecret };
