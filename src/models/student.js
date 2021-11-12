"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate({ StudentQuizAnswer, StudentSubject }) {
      this.hasMany(StudentQuizAnswer);
      this.hasMany(StudentSubject);
    }
  }
  Student.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      contactNumber: { type: DataTypes.STRING, allowNull: false },
      userName: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      profile: { type: DataTypes.STRING, allowNull: true },
      isActive: { type: DataTypes.BOOLEAN, allowNull: true },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Student",
      updatedAt: true,
      paranoid: true,
    }
  );
  return Student;
};
