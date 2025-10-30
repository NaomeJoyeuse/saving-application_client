'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('accounts', 'accountNumber', {
      type: Sequelize.STRING(10),
      allowNull: false,
      unique: true,
      defaultValue: 'TEMP000000', // temporary placeholder for existing rows
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
