"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate({ Lesson, Quiz, Teacher, StudentSubject }) {
      this.hasMany(Lesson, { foreignKey: "subjectId" });
      this.hasMany(Quiz);
      this.hasMany(StudentSubject);
      this.belongsTo(Teacher);
    }
  }
  Subject.init(
    {
      code: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      teacherId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Subject",
      updatedAt: true,
      paranoid: true,
    }
  );
  return Subject;
};
