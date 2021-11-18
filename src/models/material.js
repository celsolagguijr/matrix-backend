"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    static associate({ Lesson }) {
      this.belongsTo(Lesson, { foreignKey: "lessonId", targetKey: "id" });
    }
  }
  Material.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      fileType: { type: DataTypes.STRING, allowNull: false },
      fileName: { type: DataTypes.STRING, allowNull: false },
      fileSize: { type: DataTypes.INTEGER, allowNull: false },
      lessonId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Material",
      updatedAt: true,
      paranoid: true,
    }
  );
  return Material;
};
