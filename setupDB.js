const mysql = require('mysql2/promise');
const { dbConfig } = require('./src/config');
require('dotenv').config();

async function connect(sql) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [data] = await conn.execute(sql);
    return data;
  } catch (error) {
    console.log('error ===', error);
    return error;
  } finally {
    await conn?.end();
  }
}
async function runcomand() {
  const info = await connect(`SHOW TABLES`);
  console.log('info ===', info);
}
runcomand();

// CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY , email VARCHAR(255) UNIQUE, password VARCHAR(255) , reg_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP )

// CREATE TABLE tutorials (id INT AUTO_INCREMENT PRIMARY KEY , user_id INT, title VARCHAR(255) , content TEXT , private BOOLEAN )
