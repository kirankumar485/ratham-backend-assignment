const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  universityID: {
    type: String,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
