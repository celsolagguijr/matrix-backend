const shortid = require("shortid");

const { Subject, StudentSubject, Student } = require("../models");

module.exports = {
  create: async (req, res) => {
    const { id } = req.token;

    try {
      const { description, code } = req.body;

      const { dataValues } = await Subject.create({
        code,
        joinCode: shortid.generate(),
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
        attributes: ["code", "description", "id", "joinCode"],
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
  joinSubject: async (req, res) => {
    const { id } = req.token;
    const { joinCode } = req.params;

    const subject = await Subject.findOne({
      where: {
        joinCode,
      },
    });

    if (!subject) {
      return res.status(404).json({
        msg: "Subject not found",
      });
    }

    const studentSubjects = await StudentSubject.findOne({
      where: {
        subjectId: subject.id,
        studentId: id,
      },
    });

    if (studentSubjects && studentSubjects.status !== 3) {
      return res.status(409).json({
        msg: "You already joined",
      });
    }

    if (studentSubjects && studentSubjects.status === 3) {
      try {
        const data = await StudentSubject.update(
          {
            status: 0,
          },
          {
            where: {
              id: studentSubjects.id,
            },
          }
        );

        return res.status(200).json({
          msg: "Successfully Joined",
        });
      } catch (error) {
        return res.status(500).json({
          msg: "Something went wrong.",
          error,
        });
      }
    }

    try {
      const data = await StudentSubject.create({
        studentId: id,
        subjectId: subject.id,
        status: 0,
      });

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        msg: "Something went wrong.",
        error,
      });
    }
  },
  getStudentSubjects: async (req, res) => {
    const { id } = req.token;

    try {
      const data = await StudentSubject.findAll({
        attributes: ["id", "status"],
        where: {
          studentId: id,
          status: 1,
        },
        include: {
          model: Subject,
          where: {
            deletedAt: null,
          },
        },
      });

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        msg: "Something went wrong.",
        error,
      });
    }
  },
  getStundentPendingApproval: async (req, res) => {
    const { subjectId } = req.params;

    try {
      const data = await StudentSubject.findAll({
        attributes: ["status", "id"],
        where: {
          subjectId,
          status: 0,
        },
        include: {
          model: Student,
          attributes: [
            "id",
            "firstName",
            "lastName",
            "userName",
            "profile",
            "email",
          ],
        },
      });

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        msg: "Something went wrong.",
        error,
      });
    }
  },

  getApprovedStudents: async (req, res) => {
    const { subjectId } = req.params;

    try {
      const data = await StudentSubject.findAll({
        attributes: ["status", "id"],
        where: {
          subjectId,
          status: 1,
        },
        include: {
          model: Student,
          attributes: [
            "id",
            "firstName",
            "lastName",
            "userName",
            "profile",
            "email",
          ],
        },
      });

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        msg: "Something went wrong.",
        error,
      });
    }
  },
  updateStatus: async (req, res) => {
    const { status, id } = req.params;

    try {
      const result = await StudentSubject.update(
        {
          status,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.status(200).json({
        success: true,
        msg: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong.",
      });
    }
  },
};
