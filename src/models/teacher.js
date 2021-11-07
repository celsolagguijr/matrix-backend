"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Subject }) {
      this.hasMany(Subject);
    }
  }
  Teacher.init(
    {
      lastName: { type: DataTypes.STRING, allowNull: false },
      firstName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      userName: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      contactNumber: { type: DataTypes.STRING, allowNull: true },
      profile: { type: DataTypes.STRING, allowNull: true },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Teacher",
      updatedAt: true,
    }
  );
  return Teacher;
};
