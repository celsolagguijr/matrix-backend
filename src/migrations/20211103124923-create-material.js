"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Materials", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(50),
      },
      description: {
        type: Sequelize.STRING(150),
      },
      fileType: {
        type: Sequelize.STRING(10),
      },
      fileName: {
        type: Sequelize.STRING(150),
      },
      fileSize: {
        type: Sequelize.INTEGER,
      },
      lessonId: {
        type: Sequelize.INTEGER,
        references: {
          model: "lessons",
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
    await queryInterface.dropTable("Materials");
  },
};
