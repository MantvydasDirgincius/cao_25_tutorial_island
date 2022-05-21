const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function registerUser(email, password) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const [result] = await conn.execute(sql, [email, password]);
    return result;
  } catch (error) {
    throw error;
  } finally {
    conn?.end();
  }
}

module.exports = {
  registerUser,
};
