"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    static associate({ Material, Subject }) {
      this.hasMany(Material, {
        foreignKey: "lessonId",
      });
      this.belongsTo(Subject, {
        foreignKey: "subjectId",
        targetKey: "id",
      });
    }
  }
  Lesson.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      instructions: { type: DataTypes.STRING, allowNull: false },
      startsAt: { type: DataTypes.DATE, allowNull: false },
      endsAt: { type: DataTypes.DATE, allowNull: false },
      subjectId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Lesson",
      updatedAt: true,
      paranoid: true,
    }
  );
  return Lesson;
};
