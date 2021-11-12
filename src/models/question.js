"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate({ Choice, Quiz, StudentQuizAnswer }) {
      this.belongsTo(Quiz);
      this.hasMany(Choice);
      this.hasMany(StudentQuizAnswer);
    }
  }
  Question.init(
    {
      question: { type: DataTypes.STRING, allowNull: false },
      points: { type: DataTypes.INTEGER, allowNull: false },
      quizId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Question",
      updatedAt: true,
      paranoid: true,
    }
  );
  return Question;
};
