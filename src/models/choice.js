"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Choice extends Model {
    static associate({ Question, StudentQuizAnswer }) {
      this.belongsTo(Question);
      this.hasMany(StudentQuizAnswer);
    }
  }
  Choice.init(
    {
      description: { type: DataTypes.STRING, allowNull: false },
      isCorrectAnswer: { type: DataTypes.BOOLEAN, allowNull: false },
      questionId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Choice",
      updatedAt: true,
      paranoid: true,
    }
  );
  return Choice;
};
