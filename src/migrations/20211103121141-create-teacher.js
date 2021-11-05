"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Teachers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      lastName: {
        type: Sequelize.STRING(30),
      },
      firstName: {
        type: Sequelize.STRING(30),
      },
      email: {
        type: Sequelize.STRING(100),
      },
      userName: {
        type: Sequelize.STRING(50),
      },
      password: {
        type: Sequelize.STRING(120),
      },
      profile: {
        type: Sequelize.STRING(200),
      },
      isActive: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Teachers");
  },
};
