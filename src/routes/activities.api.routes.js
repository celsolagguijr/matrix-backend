const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/token.validations");
const {
  getTeacherActivity,
  createActivity,
  editActivity,
  deleteActivity,
  getActiveActivities,
  getStudentActivityAttachments,
  uploadActivityAttachments,
  uploadStudentActivity,
  deleteAttachment,
} = require("../controllers/activities.controller");

const {
  upload: activityUpload,
} = require("../middlewares/upload.activity.attachments.js");
const {
  upload: studentActivity,
} = require("../middlewares/upload.student.activity.js");

// id => lesson id

router
  .route("/lessons/:id/activities")
  .get([validateToken], async (req, res) => {
    return await getTeacherActivity(req, res);
  });

// id => lesson id

router
  .route("/lessons/:id/activities")
  .post([validateToken], async (req, res) => {
    return await createActivity(req, res);
  });

//id => lesson id
router
  .route("/lessons/:id/activities/:activity_id")
  .put([validateToken], async (req, res) => {
    return await editActivity(req, res);
  });

// id => lesson id
router
  .route("/lessons/:id/activities/:activity_id")
  .delete([validateToken], async (req, res) => {
    return await deleteActivity(req, res);
  });

//students

router
  .route("/lessons/:id/active-activities")
  .get([validateToken], async (req, res) => {
    return await getActiveActivities(req, res);
  });

router
  .route("/activities/:id/student-activities")
  .get([validateToken], async (req, res) => {
    return await getStudentActivityAttachments(req, res);
  });

//upload

router
  .route("/activities/:id/upload")
  .post(
    [validateToken, activityUpload.single("activity")],
    async (req, res) => {
      return await uploadActivityAttachments(req, res);
    }
  );

router
  .route("/activities/:id/upload-student-activity")
  .post(
    [validateToken, studentActivity.single("student_activity")],
    async (req, res) => {
      return await uploadStudentActivity(req, res);
    }
  );

//delete attachments
router
  .route("/activities/:id/:filename")
  .delete([validateToken], async (req, res) => {
    return await deleteAttachment(req, res);
  });

//download

router.route("/activities/:filename/download").get(async (req, res) => {
  res.download(`public/activities/${req.params.filename}`);
});

router.route("/student-activities/:filename/download").get(async (req, res) => {
  res.download(`public/student_activities/${req.params.filename}`);
});

module.exports = router;
