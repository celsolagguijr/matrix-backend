const express = require("express");
const router = express.Router();
const { Student } = require("../models");

router.route("/students").get(async (req, res) => {
  const result = await Student.findAll();
  res.status(200).json(result);
});

module.exports = router;
