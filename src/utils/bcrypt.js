const bcrypt = require("bcrypt");
const saltRounds = 7;

module.exports = {
  hashPassword: async (password) => await bcrypt.hash(password, saltRounds),
  validatePassword: async (enteredPassword, savedPassword) =>
    await bcrypt.compare(enteredPassword, savedPassword),
};
