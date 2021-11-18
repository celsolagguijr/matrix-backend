const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/token.validations");
const { upload } = require("../middlewares/upload.file.middleware");
const { create, remove } = require("../controllers/material.controller");

router
  .route("/materials")
  .post([validateToken, upload.single("material")], async (req, res) => {
    return await create(req, res);
  });

router.route("/materials/:id").delete([validateToken], async (req, res) => {
  return await remove(req, res);
});

router.route("/materials/:filename/download").get(async (req, res) => {
  res.download(`public/materials/${req.params.filename}`);
});

module.exports = router;
