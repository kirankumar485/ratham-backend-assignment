const { Session } = require("../models/session");
const { Booking } = require("../models/booking");
const { Student } = require("../models/student");

const { v4: uuidv4 } = require("uuid");

const studentController = {
  register: async (req, res) => {
    const { name, password, universityID } = req.body;
    console.log(name, password, universityID);

    try {
      const student = new Student({
        universityID,
        password,
        name,
      });

      await student.save();

      res.json({ universityID });
    } catch (error) {
      res.sendStatus(500);
    }
  },

  login: async (req, res) => {
    const { universityID, password } = req.body;

    try {
      const student = await Student.findOne({ universityID, password });

      if (student) {
        const token = uuidv4();
        console.log(token);
        student.token = token;
        await student.save();

        res.json({ token });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      res.sendStatus(500);
    }
  },

  getSessions: async (req, res) => {
    try {
      const sessions = await Session.find();
      res.json({ sessions });
    } catch (error) {
      res.sendStatus(500);
    }
  },

  bookSession: async (req, res) => {
    const { sessionID } = req.body;
    const token = req.headers.authorization; // Assuming the token is sent in the Authorization header
    const student = await Student.findOne({ token }); // Find the student using the token

    try {
      const session = await Session.findOne({ _id: sessionID });

      if (session && student) {
        const bookingTime = session.time; // Retrieve the session's time
        const bookingID = uuidv4();

        const booking = new Booking({
          sessionID,
          studentName: student.name,
          bookingTime,
        });

        await booking.save();

        // Delete the booked session
        await Session.findOneAndDelete({ _id: sessionID });

        res.json({ bookingID });
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.sendStatus(500);
    }
  },
};

module.exports = { studentController };
