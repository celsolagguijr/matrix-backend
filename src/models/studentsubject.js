"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentSubject extends Model {
    static associate({ Student, Subject }) {
      this.belongsTo(Student);
      this.belongsTo(Subject);
    }
  }
  StudentSubject.init(
    {
      studentId: { type: DataTypes.INTEGER, allowNull: false },
      subjectId: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "StudentSubject",
      updatedAt: true,
      paranoid: true,
    }
  );
  return StudentSubject;
};
