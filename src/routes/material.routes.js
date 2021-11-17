const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/token.validations");
const { upload } = require("../middlewares/upload.file.middleware");
const { create } = require("../controllers/material.controller");

router
  .route("/lessons/:lesson_id/materials")
  .post([upload.single("material")], async (req, res) => {
    // return await create(req, res);

    return res.status(200).json({
      file: req.file,
      fields: req.body,
    });
  });

module.exports = router;
