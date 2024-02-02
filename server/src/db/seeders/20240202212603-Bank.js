module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'banks',
      [
        {
          cardNumber: '4564654564564564',
          name: 'SquadHelp',
          expiry: '11/24',
          cvc: '453',
          balance: 0,
        },
        {
          cardNumber: '4111111111111111',
          name: 'yriy',
          expiry: '09/24',
          cvc: '505',
          balance: 5000,
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('banks');
  },
};
