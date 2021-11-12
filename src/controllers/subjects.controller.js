const { Subject } = require("../models");

module.exports = {
  create: async (req, res) => {
    const { id } = req.token;

    try {
      const { description, code } = req.body;

      const { dataValues } = await Subject.create({
        code,
        description,
        teacherId: id,
      });

      return res.status(201).json({
        success: true,
        msg: "Subject successfully created.",
        data: {
          ...dataValues,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong.",
      });
    }
  },

  update: async (req, res) => {
    try {
      const { description, code, id } = req.body;

      const result = await Subject.update(
        {
          code,
          description,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.status(200).json({
        success: true,
        msg: "Subject updated successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong.",
      });
    }
  },

  remove: async (req, res) => {
    const id = req.params.id;

    try {
      const result = await Subject.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json({
        success: true,
        msg: "Subject deleted successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong.",
        error,
      });
    }
  },

  getTeacherSubjects: async (req, res) => {
    const { id } = req.token;

    try {
      const data = await Subject.findAll({
        attributes: ["code", "description", "id"],
        where: {
          teacherId: id,
        },
      });

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        msg: "Something went wrong.",
        error,
      });
    }
  },
};
