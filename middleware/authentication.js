const { Dean } = require("../models/dean");
const { Student } = require("../models/student");

const validateStudentToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const student = await Student.findOne({ token: bearerHeader });
    if (student) {
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};

const validateDeanToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const dean = await Dean.findOne({ token: bearerHeader });

    if (dean) {
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};

module.exports = { validateStudentToken, validateDeanToken };
