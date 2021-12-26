const { Teacher } = require("../models");
const { validatePassword, hashPassword } = require("../utils/bcrypt");
const { generateAccessToken } = require("../utils/jwt");

module.exports = {
  async authenticate(req, res) {
    const { userName, password } = req.body;

    try {
      const teacher = await Teacher.findOne({
        where: {
          userName,
        },
      });

      if (!teacher) {
        res.status(401).json({
          success: false,
          message: "Teacher not found",
        });
      }

      if (!(await validatePassword(password, teacher.password))) {
        res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      res.json({
        message: "Authentication successful",
        data: {
          user: {
            userName: teacher.userName,
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            contactNumber: teacher.contactNumber,
            email: teacher.email,
            profile: teacher.profile,
            birthdate: teacher.birthdate,
            address: teacher.address,
            access_token: await generateAccessToken({
              id: teacher.id,
              userType: "teacher",
            }),
          },
        },
      });
    } catch (errors) {
      res.status(500).json({
        success: false,
        message: "Something went wrong.",
      });
    }
  },

  async create(req, res) {
    const { firstName, lastName, email, userName, password } = req.body;

    const teacher = await Teacher.findOne({
      where: {
        userName,
      },
    });

    if (teacher) {
      return res.status(409).json({
        message: "Username already exist!",
      });
    }

    try {
      const newTeacher = await Teacher.create({
        firstName,
        lastName,
        email,
        userName,
        password: await hashPassword(password),
        isActive: true,
      });

      return res.status(201).json({
        data: {
          id: newTeacher.id,
          userName: newTeacher.userName,
          firstName: newTeacher.firstName,
          lastName: newTeacher.lastName,
        },
        message: "Successfully Registered",
      });
    } catch (error) {
      return res.status(500).json({
        error,
        message: "Something went wrong.",
      });
    }
  },
  async updateProfile(req, res) {
    const { id } = req.token;

    try {
      const result = await Teacher.update({ ...req.body }, { where: { id } });

      return res.status(200).json({
        success: true,
        msg: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        error,
        message: "Something went wrong.",
      });
    }
  },
  async changePassword(req, res) {
    const { id } = req.token;

    const { password } = req.body;

    try {
      const result = await Teacher.update(
        { password: await hashPassword(password) },
        { where: { id } }
      );

      return res.status(200).json({
        success: true,
        msg: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        error,
        message: "Something went wrong.",
      });
    }
  },
  async updateProfilePicture(req, res) {
    const { id } = req.token;

    const { filename: fileName } = req.file;

    try {
      const result = await Teacher.update(
        { profile: fileName },
        { where: { id } }
      );

      return res.status(200).json({
        success: true,
        msg: "Success",
        newProfile: fileName,
      });
    } catch (error) {
      return res.status(500).json({
        error,
        message: "Something went wrong.",
      });
    }
  },
};
