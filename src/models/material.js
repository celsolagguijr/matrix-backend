"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    static associate({ Lesson }) {
      this.belongsTo(Lesson);
    }
  }
  Material.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      attachedFile: { type: DataTypes.STRING, allowNull: false },
      lessionId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Material",
      updatedAt: true,
    },
  );
  return Material;
};
