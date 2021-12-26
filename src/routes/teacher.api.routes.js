const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/token.validations");
const {
  create,
  updateProfile,
  changePassword,
  updateProfilePicture,
} = require("../controllers/teacher.controller");
const { upload } = require("../middlewares/upload.profile.js");

router.route("/teachers").post(async (req, res) => {
  return await create(req, res);
});

router.route("/teachers").put([validateToken], async (req, res) => {
  return await updateProfile(req, res);
});

router
  .route("/teachers/change-password")
  .put([validateToken], async (req, res) => {
    return await changePassword(req, res);
  });

router
  .route("/teachers/change-profile")
  .post([validateToken, upload.single("profile")], async (req, res) => {
    return await updateProfilePicture(req, res);
  });

module.exports = router;
