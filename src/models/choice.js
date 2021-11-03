"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Choice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Choice.init(
    {
      description: { type: DataTypes.STRING, allowNull: false },
      isCorrectAnswer: { type: DataTypes.BOOLEAN, allowNull: false },
      questionId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Choice",
      updatedAt: "updateTimestamp",
      underscored: true,
    },
  );
  return Choice;
};
