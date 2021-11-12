"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentQuizAnswer extends Model {
    static associate({ Student, Choice, Question }) {
      this.belongsTo(Student);
      this.belongsTo(Choice);
      this.belongsTo(Question);
    }
  }
  StudentQuizAnswer.init(
    {
      studentId: { type: DataTypes.INTEGER, allowNull: false },
      quizId: { type: DataTypes.INTEGER, allowNull: false },
      answerId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "StudentQuizAnswer",
      updatedAt: true,
      paranoid: true,
    }
  );
  return StudentQuizAnswer;
};
