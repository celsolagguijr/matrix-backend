"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LessonActivity extends Model {
    static associate({
      StudentSubmittedActivity,
      LessonActivityAttachment,
      Lesson,
    }) {
      this.hasMany(StudentSubmittedActivity, {
        foreignKey: "lessonActivityId",
      });

      this.hasMany(LessonActivityAttachment, {
        foreignKey: "lessonActivityId",
      });

      this.belongsTo(Lesson, {
        foreignKey: "lessonId",
        targetKey: "id",
      });
    }
  }
  LessonActivity.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      dateStart: DataTypes.DATE,
      dateEnd: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "LessonActivity",
      updatedAt: true,
      paranoid: true,
    }
  );
  return LessonActivity;
};
