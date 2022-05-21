const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function createTutorial(user_id, title, content, private) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO tutorials (user_id, title, content, private) VALUES (?, ?, ?, ?)';
    const [result] = await conn.execute(sql, [user_id, title, content, private]);
    return result;
  } catch (error) {
    throw error;
  } finally {
    await conn?.end();
  }
}
async function getTutorials(msg) {
  let conn;
  try {
    const sql =
      msg === 'notoken' ? 'SELECT * FROM tutorials WHERE private = 0 ' : 'SELECT * FROM tutorials';
    conn = await mysql.createConnection(dbConfig);

    const [result] = await conn.execute(sql);
    return result;
  } catch (error) {
    throw error;
  } finally {
    await conn?.end();
  }
}

module.exports = { createTutorial, getTutorials };
