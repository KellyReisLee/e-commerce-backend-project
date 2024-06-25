
//Constructor function or class:
const Sequelize = require("sequelize")

// New Instance:
const sequelize = new Sequelize('node_complete', 'root', process.env.DATABASE_PASSWORD, { dialect: 'mysql', host: 'localhost' })



// Testing the connection:

// async function testConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// testConnection();

module.exports = sequelize;





// # - MySQL2 setting:

// const mysql = require('mysql2')

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'node_complete',
//   password: process.env.DATABASE_PASSWORD,
//   port: 3306
// })

// module.exports = pool.promise();