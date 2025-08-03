const USER_DATA = require('../../data/USER_DATA.json');
const { requestLogger } = require('../../configs/logger');

// Script to seed users into the database
const seedUsers = async () => {
  try {
    // Assuming you have a User model set up with Sequelize
    const User = require('../../models/user'); // Adjust the path as necessary

    // Clear existing users (optional)
    await User.destroy({ where: {}, truncate: true });

    // Seed new users
    await User.bulkCreate(USER_DATA);
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}