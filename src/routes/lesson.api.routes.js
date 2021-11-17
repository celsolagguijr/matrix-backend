const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/token.validations");
const {
  getTeachersLessons,
  create,
  update,
  remove,
  viewLesson,
} = require("../controllers/lesson.controller");

router
  .route("/subjects/:subject_id/lessons")
  .get([validateToken], async (req, res) => {
    return await getTeachersLessons(req, res);
  });

router
  .route("/subjects/:subject_id/lessons")
  .post([validateToken], async (req, res) => {
    return await create(req, res);
  });

router.route("/lessons/:lesson_id").put([validateToken], async (req, res) => {
  return await update(req, res);
});

router
  .route("/lessons/:lesson_id")
  .delete([validateToken], async (req, res) => {
    return await remove(req, res);
  });

router.route("/lessons/:lesson_id").get(async (req, res) => {
  return await viewLesson(req, res);
});

module.exports = router;
