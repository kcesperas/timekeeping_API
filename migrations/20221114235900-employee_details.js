'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employee_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_name: {
        type: Sequelize.STRING
      },
      employee_postion: {
        type: Sequelize.STRING
      },
      contact_number: {
        type: Sequelize.STRING
      },
      assigned_email: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      date_hired: {
        type: Sequelize.DATE,
      },
      employment_period: {
        type: Sequelize.STRING,
      },
      employment_status: {
        type: Sequelize.STRING,
      },
      salary: {
        type: Sequelize.INTEGER,
      },
      notes: {
        type: Sequelize.STRING,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employee_details');
  }
};