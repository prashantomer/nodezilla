'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: { type: DataTypes.STRING, allowNull: false },
    phone_number: { type: DataTypes.STRING, allowNull: true },
    gender: { type: DataTypes.STRING, allowNull: false },
    ip_address: DataTypes.STRING,
    active: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true, // Use snake_case for column names

    hooks: {
      beforeValidate: (user) => {
        // console.log('Before beforeValidate hook: ---', user);
        if (!user.username) {
          user.username = `${user.first_name}_${user.last_name}`.toLowerCase();
        }
      },
      beforeCreate: (user) => {
        // console.log('Before beforeCreate hook: ---', user);
        if (!user.username) {
          user.username = `${user.first_name}_${user.last_name}`.toLowerCase();
        }
      },
      beforeBulkCreate: (users) => {
        users.forEach(user => {
          // console.log('Before beforeBulkCreate hook: ---', user);
          if (!user.username) {
            user.username = `${user.first_name}_${user.last_name}`.toLowerCase();
          }
        });
      }
    }
  });
  return User;
};