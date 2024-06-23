const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node_complete',
  password: process.env.DATABASE_PASSWORD,
  port: 3306
})

module.exports = pool.promise();