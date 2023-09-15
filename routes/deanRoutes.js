const express = require("express");
const { deanController } = require("../controller/deanController");
const { validateDeanToken } = require("../middleware/authentication");

const router = express.Router();

router.post("/register", deanController.register);
router.post("/login", deanController.login);
router.get(
  "/pending-sessions",
  validateDeanToken,
  deanController.getPendingSessions
);

module.exports = router;
