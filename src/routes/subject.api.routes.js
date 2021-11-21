const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/token.validations");
const {
  create,
  update,
  remove,
  joinSubject,
  getTeacherSubjects,
  getStudentSubjects,
  getStundentPendingApproval,
  getApprovedStudents,
  updateStatus,
} = require("../controllers/subjects.controller");

router.route("/subjects/teacher").get([validateToken], async (req, res) => {
  return await getTeacherSubjects(req, res);
});

// get  student subjects
router.route("/subjects/student").get([validateToken], async (req, res) => {
  return await getStudentSubjects(req, res);
});

// get for approval students
router
  .route("/subjects/:subjectId/students/for-approval")
  .get([validateToken], async (req, res) => {
    return await getStundentPendingApproval(req, res);
  });

// get students from subject
router
  .route("/subjects/:subjectId/students")
  .get([validateToken], async (req, res) => {
    return await getApprovedStudents(req, res);
  });

// joining a subject
router
  .route("/subjects/:joinCode/join")
  .post([validateToken], async (req, res) => {
    return await joinSubject(req, res);
  });

// for approval
router
  .route("/subjects/student-subject/:id/:status")
  .put([validateToken], async (req, res) => {
    return await updateStatus(req, res);
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
