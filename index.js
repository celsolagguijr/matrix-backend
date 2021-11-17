const express = require("express");
const app = express();
const cors = require("cors");
const portToListen = process.env.PORT || 3000;

//routes
const { getApiRoutes } = require("./src/routes");

//env
const path = require("path");
require("dotenv").config();

//middlewares
const cookieParser = require("cookie-parser");
// const session = require("express-session");
const bodyParser = require("body-parser");

// const formidableMiddleware = require("express-formidable");

// app.use(
//   formidableMiddleware({
//     encoding: "utf-8",
//     uploadDir: "/my/dir",
//     multiples: false,
//   })
// );

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); //parse application/x-www-form-urlencoded
app.use(express.json()); //middleware for json parser
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public"))); //resources

//get routes
getApiRoutes(app);

// app.use("/materials", upload.single("material"), function (req, res) {
//   res.status(200).json({
//     file: req.file,
//   });
// });

app.listen(portToListen, () =>
  console.log("Listening on port : " + portToListen)
);
