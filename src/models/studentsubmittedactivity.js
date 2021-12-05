"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentSubmittedActivity extends Model {
    static associate({ LessonActivity, Student }) {
      this.belongsTo(LessonActivity, {
        foreignKey: "lessonActivityId",
        targetKey: "id",
      });

      this.belongsTo(Student, {
        foreignKey: "studentId",
        targetKey: "id",
      });
    }
  }
  StudentSubmittedActivity.init(
    {
      filename: DataTypes.STRING,
      studentsId: DataTypes.INTEGER,
      lessonActivityId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "StudentSubmittedActivity",
    }
  );
  return StudentSubmittedActivity;
};
