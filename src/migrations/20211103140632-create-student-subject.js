"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("StudentSubjects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      studentId: {
        type: Sequelize.INTEGER,
        references: {
          model: "students",
          key: "id",
        },
      },
      subjectId: {
        type: Sequelize.INTEGER,
        references: {
          model: "subjects",
          key: "id",
        },
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
      },
      dateApproved: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("StudentSubjects");
  },
};
