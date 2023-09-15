const mongoose = require("mongoose");

const deanSchema = new mongoose.Schema({
  universityID: {
    type: String,
  },
  name: {
    typr: String,
  },
  password: {
    type: String,
  },
  toke: {
    type: String,
  },
});

const Dean = mongoose.model("Dean", deanSchema);

module.exports = { Dean };
