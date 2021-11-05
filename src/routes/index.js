const AuthRoutes = require("./auth.api.routes");
const StudentRoutes = require("./student.api.routes");
const TeacherRoutes = require("./teacher.api.routes");

const apis = [AuthRoutes, StudentRoutes, TeacherRoutes];

function getApiRoutes(app) {
  for (let i = 0; i < apis.length; i++) {
    app.use("/api/", apis[i]);
  }
}

module.exports = { getApiRoutes };
