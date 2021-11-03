const AuthRoutes = require("./auth.api.routes");

const apis = [AuthRoutes];

function getApiRoutes(app) {
  for (let i = 0; i < apis.length; i++) {
    app.use("/api/", apis[i]);
  }
}

module.exports = { getApiRoutes };
