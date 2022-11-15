'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Taskboard', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subject: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      assigned_to: {
        type: Sequelize.STRING,
      },
      notes: {
        type: Sequelize.STRING,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Taskboard');
  }
};