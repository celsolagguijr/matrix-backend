const jwt = require("jsonwebtoken");
require("dotenv").config;

const generateAccessToken = async (payload) =>
  await jwt.sign({ payload }, process.env.SECRET_KEY_ACCESS_TOKEN, {
    expiresIn: "3d",
  });

const verifyAccessToken = async (token) =>
  await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
