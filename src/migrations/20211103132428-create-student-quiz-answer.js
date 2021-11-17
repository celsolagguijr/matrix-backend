"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("StudentQuizAnswers", {
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
      quizId: {
        type: Sequelize.INTEGER,
        references: {
          model: "questions",
          key: "id",
        },
      },
      answerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "choices",
          key: "id",
        },
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
    await queryInterface.dropTable("StudentQuizAnswers");
  },
};
