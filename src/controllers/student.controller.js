const { Student } = require("../models");
const { validatePassword, hashPassword } = require("../utils/bcrypt");
const { generateAccessToken } = require("../utils/jwt");

module.exports = {
  async authenticate(req, res) {
    const { userName, password } = req.body;

    try {
      const student = await Student.findOne({
        attributes: { exclude: ["email", "contactNumber"] },
        where: {
          userName,
        },
      });

      if (!student) {
        res.status(401).json({
          success: false,
          message: "Student not found",
        });
      }

      if (!(await validatePassword(password, student.password))) {
        res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      res.json({
        message: "Authentication successful",
        data: {
          user: {
            userName: student.userName,
            firstName: student.firstName,
            lastName: student.lastName,
            access_token: await generateAccessToken({
              id: student.id,
              userType: "student",
            }),
          },
        },
      });
    } catch (errors) {
      console.log(errors);
      res.status(500).json({
        success: false,
        message: "Something went wrong.",
      });
    }
  },

  async create(req, res) {
    const { firstName, lastName, email, contactNumber, userName, password } =
      req.body;

    const student = await Student.findOne({
      where: {
        userName,
      },
    });

    if (student) {
      return res.status(409).json({
        message: "Username already exist!",
      });
    }

    try {
      const newStudent = await Student.create({
        firstName,
        lastName,
        email,
        contactNumber,
        userName,
        password: await hashPassword(password),
        isActive: true,
      });

      return res.status(201).json({
        data: {
          id: newStudent.id,
          userName: newStudent.userName,
          firstName: newStudent.firstName,
          lastName: newStudent.lastName,
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
  async getStudents(req, res) {
    const result = await Student.findAll();
    res.status(200).json(result);
  },
};
