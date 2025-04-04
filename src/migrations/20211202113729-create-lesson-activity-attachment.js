"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("LessonActivityAttachments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      lessonActivityId: {
        type: Sequelize.INTEGER,
        references: {
          model: "lessonactivities",
          key: "id",
        },
      },
      filename: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("LessonActivityAttachments");
  },
};
