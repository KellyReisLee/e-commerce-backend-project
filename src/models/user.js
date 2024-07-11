'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.Product, {
        foreignKey: 'admin_id',
        as: 'adminId',
        onDelete: 'CASCADE'
      });
      User.hasOne(models.Cart, {
        foreignKey: 'user_id',
        as: 'userId',
        onDelete: 'CASCADE'
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};