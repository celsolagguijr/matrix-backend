const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/token.validations");
const { getStudents, create } = require("../controllers/student.controller");

router.route("/students").get([validateToken], async (req, res) => {
  return await getStudents(req, res);
});

router.route("/students").post(async (req, res) => {
  return await create(req, res);
});

module.exports = router;
