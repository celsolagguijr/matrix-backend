const AuthRoutes = require("./auth.api.routes");
const StudentRoutes = require("./student.api.routes");
const TeacherRoutes = require("./teacher.api.routes");
const SubjectRoutes = require("./subject.api.routes");
const LessonRoutes = require("./lesson.api.routes");
const MaterialRoutes = require("./material.routes");

const apis = [
  AuthRoutes,
  StudentRoutes,
  TeacherRoutes,
  SubjectRoutes,
  LessonRoutes,
  MaterialRoutes,
];

function getApiRoutes(app) {
  for (let i = 0; i < apis.length; i++) {
    app.use("/api/", apis[i]);
  }
}

module.exports = { getApiRoutes };
