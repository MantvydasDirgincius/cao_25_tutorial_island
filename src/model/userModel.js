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
    await conn?.end();
  }
}
async function loginUser(email) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM users WHERE email=?';
    const [result] = await conn.execute(sql, [email]);
    console.log('result ===', result);
    return result;
  } catch (error) {
    throw error;
  } finally {
    await conn?.end();
  }
}

module.exports = {
  registerUser,
  loginUser,
};
