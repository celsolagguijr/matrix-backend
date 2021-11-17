const { Material } = require("../models");

module.exports = {
  create: async (req, res) => {
    const { lesson_id } = req.params;
    const { title, description, attachedFile } = req.body;

    try {
      const { dataValues } = await Material.create({
        title,
        description,
        attachedFile,
        lessonId: lesson_id,
      });

      return res.status(201).json({
        success: true,
        msg: "Material successfully created.",
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
};
