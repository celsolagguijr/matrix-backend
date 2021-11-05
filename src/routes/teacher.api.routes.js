const express = require("express");
const router = express.Router();
const { create } = require("../controllers/teacher.controller");

router.route("/teachers").post(async (req, res) => {
  return await create(req, res);
});

module.exports = router;
