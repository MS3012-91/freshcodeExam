('use strict');

const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'buyer',
          last_name: 'buyer',
          display_name: 'buyer',
          password: bcrypt.hashSync('123456', SALT_ROUNDS),
          email: 'buyer@mail.com',
          role: 'customer',
        },
        {
          first_name: 'creator',
          last_name: 'creator',
          display_name: 'creator',
          password: bcrypt.hashSync('123456', SALT_ROUNDS),
          email: 'creator@mail.com',
          role: 'creator',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
