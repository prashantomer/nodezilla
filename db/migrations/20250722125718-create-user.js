'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING,
        underscored: true
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING,
        underscored: true
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      gender: {
        type: Sequelize.STRING
      },
      ip_address: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        underscored: true
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        underscored: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};