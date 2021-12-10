const {
  LessonActivity,
  LessonActivityAttachment,
  StudentSubmittedActivity,
  Student,
} = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");
const fs = require("fs");

module.exports = {
  getTeacherActivity: async (req, res) => {
    const { id } = req.params;

    try {
      const activities = await LessonActivity.findAll({
        attributes: { exclude: ["updatedAt", "deletedAt"] },
        where: {
          lessonId: id,
          // dateEnd: {
          //   [Op.gt]: moment(),
          // },
        },
        include: {
          model: LessonActivityAttachment,
        },
      });

      return res.status(200).json([...activities]);
    } catch (error) {
      return res.status(500).json({
        msg: "Something went wrong.",
        error,
      });
    }
  },

  createActivity: async (req, res) => {
    const { id } = req.params;

    const { title, description, dateStart, dateEnd } = req.body;

    try {
      const { dataValues } = await LessonActivity.create({
        title,
        description,
        lessonId: id,
        dateStart,
        dateEnd,
      });

      return res.status(201).json({
        success: true,
        msg: "Activity successfully created.",
        data: {
          ...dataValues,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong.",
        error,
      });
    }
  },

  editActivity: async (req, res) => {
    const { activity_id } = req.params;

    const { title, description, dateStart, dateEnd } = req.body;

    try {
      const result = await LessonActivity.update(
        {
          title,
          description,
          dateStart,
          dateEnd,
        },
        {
          where: {
            id: activity_id,
          },
        }
      );

      return res.status(201).json({
        success: true,
        msg: "Activity successfully updated.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong.",
        error,
      });
    }
  },

  deleteActivity: async (req, res) => {
    const { activity_id } = req.params;

    try {
      const result = await LessonActivity.destroy({
        where: {
          id: activity_id,
        },
      });

      return res.status(200).json({
        success: true,
        msg: "Activity deleted successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong.",
        error,
      });
    }
  },

  getActiveActivities: async (req, res) => {
    const { id: studentId } = req.token;

    const { id } = req.params;

    try {
      const activities = await LessonActivity.findAll({
        attributes: { exclude: ["updatedAt", "deletedAt"] },
        where: {
          lessonId: id,
          dateEnd: {
            [Op.gt]: moment(),
          },
        },
        include: [
          {
            model: LessonActivityAttachment,
          },

          {
            model: StudentSubmittedActivity,
            where: {
              studentId,
            },
            required: false,
            attributes: { exclude: ["updatedAt", "deletedAt", "studentsId"] },
          },
        ],
      });

      return res.status(200).json([...activities]);
    } catch (error) {
      return res.status(500).json({
        msg: "Something went wrong.",
        error,
      });
    }
  },

  getStudentActivityAttachments: async (req, res) => {
    const { id } = req.params;

    try {
      const activities = await StudentSubmittedActivity.findAll({
        attributes: { exclude: ["updatedAt", "deletedAt", "studentsId"] },
        where: {
          lessonActivityId: id,
        },
        include: [
          {
            model: Student,
            attributes: { exclude: ["updatedAt", "deletedAt", "password"] },
          },
          {
            model: LessonActivity,
            attributes: ["dateEnd"],
          },
        ],
      });

      return res.status(200).json([...activities]);
    } catch (error) {
      return res.status(500).json({
        msg: "Something went wrong.",
        error,
      });
    }
  },

  uploadActivityAttachments: async (req, res) => {
    const { id } = req.params;
    const { filename } = req.file;
    const { title } = req.body;

    try {
      const { dataValues } = await LessonActivityAttachment.create({
        title,
        filename,
        lessonActivityId: id,
      });

      return res.status(201).json({
        success: true,
        msg: "Uploaded Successfully",
        data: {
          ...dataValues,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong.",
        error,
      });
    }
  },
  uploadStudentActivity: async (req, res) => {
    const { id } = req.token;
    const { id: activity_id } = req.params;
    const { filename } = req.file;
    const { title } = req.body;

    try {
      const { dataValues } = await StudentSubmittedActivity.create({
        title,
        filename,
        lessonActivityId: activity_id,
        studentId: id,
      });

      return res.status(201).json({
        success: true,
        msg: "Uploaded Successfully",
        data: {
          ...dataValues,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong.",
        error,
      });
    }
  },
  deleteAttachment: async (req, res) => {
    const { id, filename } = req.params;

    fs.unlink(`public/activities/${filename}`, async (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          msg: "Failed to delete attached file",
        });
      }

      try {
        const result = await LessonActivityAttachment.destroy({
          where: {
            id,
          },
        });

        return res.status(200).json({
          success: true,
          msg: "Deleted successfully.",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          msg: "Something went wrong.",
          error,
        });
      }
    });
  },
};
