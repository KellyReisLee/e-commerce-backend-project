const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  // Adicione outros campos se necessário
}, {
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
});

module.exports = Cart;
