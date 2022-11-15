'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Timelogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      time_in: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      time_out: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      type: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      total_hours: {
        type: Sequelize.INTEGER
      },
      notes: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};