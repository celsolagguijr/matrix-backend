const { Lesson, Subject, Material } = require("../models");

module.exports = {
  getTeachersLessons: async (req, res) => {
    const { subject_id } = req.params;

    try {
      const subject = await Subject.findOne({
        attributes: {
          exclude: ["updatedAt", "createdAt", "deletedAt", "teacherId"],
        },
        where: {
          id: subject_id,
        },
      });

      const lessons = await Lesson.findAll({
        attributes: { exclude: ["updatedAt", "deletedAt", "subjectId"] },

        where: {
          subjectId: subject_id,
        },

        // include: {
        //   model: Subject,
        //   attributes: {
        //     exclude: ["updatedAt", "createdAt", "deletedAt", "teacherId"],
        //   },
        //   required: true,
        // },
      });

      return res.status(200).json({
        subject,
        lessons: [...lessons],
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Something went wrong.",
        error,
      });
    }
  },

  create: async (req, res) => {
    const { subject_id } = req.params;
    const { title, description, instructions, startsAt, endsAt } = req.body;

    try {
      const { dataValues } = await Lesson.create({
        title,
        description,
        instructions,
        startsAt,
        endsAt,
        subjectId: subject_id,
      });

      return res.status(201).json({
        success: true,
        msg: "Lesson successfully created.",
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

  update: async (req, res) => {
    const { lesson_id } = req.params;
    const { title, description, instructions, startsAt, endsAt } = req.body;

    try {
      const result = await Lesson.update(
        {
          title,
          description,
          instructions,
          startsAt,
          endsAt,
        },
        {
          where: {
            id: lesson_id,
          },
        }
      );

      return res.status(201).json({
        success: true,
        msg: "Lesson successfully updated.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong.",
        error,
      });
    }
  },

  remove: async (req, res) => {
    const id = req.params.lesson_id;

    try {
      const result = await Lesson.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json({
        success: true,
        msg: "Lesson deleted successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong.",
        error,
      });
    }
  },

  viewLesson: async (req, res) => {
    const id = req.params.lesson_id;

    try {
      const lesson = await Lesson.findOne({
        where: {
          id,
        },
        include: Material,
      });
      return res.status(200).json(lesson);
    } catch (error) {
      return res.status(500).json({
        msg: "Something went wrong.",
        error,
      });
    }
  },
};
