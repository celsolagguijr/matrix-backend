"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    static associate({ Question, Subject }) {
      this.belongsTo(Subject);
      this.hasMany(Question);
    }
  }
  Quiz.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      passingRate: { type: DataTypes.INTEGER, allowNull: false },
      timelaps: { type: DataTypes.INTEGER, allowNull: false },
      startsAt: { type: DataTypes.DATE, allowNull: false },
      endsAt: { type: DataTypes.DATE, allowNull: false },
      isLocked: { type: DataTypes.BOOLEAN, allowNull: false },
      subjectId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Quiz",
      updatedAt: true,
    },
  );
  return Quiz;
};
