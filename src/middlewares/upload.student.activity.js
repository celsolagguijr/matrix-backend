const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/student_activities");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();

    const filenameWithoutSpaces = file.originalname.split(" ").join("");
    const newFilename = uniqueSuffix + "-" + filenameWithoutSpaces;

    cb(null, newFilename);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  upload,
};
