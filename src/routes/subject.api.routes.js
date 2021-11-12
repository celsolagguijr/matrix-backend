const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/token.validations");
const {
  create,
  update,
  remove,
  getTeacherSubjects,
} = require("../controllers/subjects.controller");

router.route("/subjects/teacher").get([validateToken], async (req, res) => {
  return await getTeacherSubjects(req, res);
});

router.route("/subjects").post([validateToken], async (req, res) => {
  return await create(req, res);
});

router.route("/subjects").put([validateToken], async (req, res) => {
  return await update(req, res);
});

router.route("/subjects/:id").delete([validateToken], async (req, res) => {
  return await remove(req, res);
});

module.exports = router;
