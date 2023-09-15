const express = require("express");
const { studentController } = require("../controller/studentController");
const { validateStudentToken } = require("../middleware/authentication");

const router = express.Router();

router.post("/login", studentController.login);
router.post("/register", studentController.register);
router.post("/book", validateStudentToken, studentController.bookSession);
router.get("/sessions", validateStudentToken, studentController.getSessions);

module.exports = router;
