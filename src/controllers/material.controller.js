const { Material } = require("../models");
const fs = require("fs");

module.exports = {
  create: async (req, res) => {
    const { mimetype, filename: fileName, size } = req.file;
    const { title, description, lesson_id } = req.body;

    try {
      const { dataValues } = await Material.create({
        title,
        description,
        fileName,
        fileSize: size,
        fileType: mimetype,
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
  remove: async (req, res) => {
    const { id } = req.params;

    const material = await Material.findOne({
      where: {
        id: id,
      },
    });

    if (!material) {
      res.status(404).json({
        success: false,
        msg: "Material not found",
      });
    }

    fs.unlink(`public/materials/${material.fileName}`, async (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          msg: "Failed to delete material",
        });
      }

      try {
        const result = await Material.destroy({
          where: {
            id,
          },
        });

        return res.status(200).json({
          success: true,
          msg: "Material deleted successfully.",
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
