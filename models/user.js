const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIcrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING
});




module.exports = User;