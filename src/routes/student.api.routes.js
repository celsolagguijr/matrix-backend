const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/token.validations");
const {
  getStudents,
  create,
  updateProfile,
  changePassword,
  updateProfilePicture,
} = require("../controllers/student.controller");
const { upload } = require("../middlewares/upload.profile.js");

router.route("/students").get([validateToken], async (req, res) => {
  return await getStudents(req, res);
});

router.route("/students").post([validateToken], async (req, res) => {
  return await create(req, res);
});

router.route("/students").put([validateToken], async (req, res) => {
  return await updateProfile(req, res);
});

router
  .route("/students/change-password")
  .put([validateToken], async (req, res) => {
    return await changePassword(req, res);
  });

router
  .route("/students/change-profile")
  .post([validateToken, upload.single("profile")], async (req, res) => {
    return await updateProfilePicture(req, res);
  });

module.exports = router;
