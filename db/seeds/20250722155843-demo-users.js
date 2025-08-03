'use strict';
const { User } = require('../../app/models'); // Adjust the path as necessary
const USER_DATA = require('./USER_DATA.json');

console.log('Seeding users...', User.bulkCreate);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('users', USER_DATA, {});

    // Clear existing users (optional)
    await User.destroy({ where: {}, truncate: true });

    // To run hooks like beforeValidate, you can use individualHooks
    await User.bulkCreate(USER_DATA, { individualHooks: true });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('users', null, {});
     */
  }
};
