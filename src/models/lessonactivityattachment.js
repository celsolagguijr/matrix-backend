"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LessonActivityAttachment extends Model {
    static associate({ LessonActivity }) {
      this.belongsTo(LessonActivity, {
        foreignKey: "lessonActivityId",
        targetKey: "id",
      });
    }
  }
  LessonActivityAttachment.init(
    {
      title: DataTypes.STRING,
      lessonActivityId: DataTypes.INTEGER,
      filename: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "LessonActivityAttachment",
    }
  );
  return LessonActivityAttachment;
};
