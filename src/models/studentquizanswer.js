"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentQuizAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
      modelName: "Teacher",
      updatedAt: "StudentQuizAnswer",
      underscored: true,
    },
  );
  return StudentQuizAnswer;
};
