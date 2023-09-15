const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  studentName: {
    type: String,
  },
  bookingTime: String,
  sessionID: {
    type: String,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = { Booking };
