const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  time: {
    type: String,
  },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = { Session };
