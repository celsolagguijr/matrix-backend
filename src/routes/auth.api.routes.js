const express = require("express");
const router = express.Router();
const {
  authenticate: studentAuth,
} = require("../controllers/student.controller");
const {
  authenticate: teacherAuth,
} = require("../controllers/teacher.controller");

router.route("/students/auth").post(async (req, res) => {
  return await studentAuth(req, res);
});

router.route("/teachers/auth").post(async (req, res) => {
  return await teacherAuth(req, res);
});

module.exports = router;
