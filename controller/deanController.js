const { Dean } = require("../models/dean");
const { Booking } = require("../models/booking");
const { v4: uuidv4 } = require("uuid");

const deanController = {
  register: async (req, res) => {
    const { name, password } = req.body;

    try {
      const universityID = name;

      const dean = new Dean({
        universityID,
        password,
        name,
      });

      await dean.save();

      res.json({ universityID });
    } catch (error) {
      res.sendStatus(500);
    }
  },

  login: async (req, res) => {
    const { universityID, password } = req.body;

    try {
      const dean = await Dean.findOne({ universityID, password });

      if (dean) {
        const token = uuidv4();
        dean.token = token;
        await dean.save();

        res.json({ token });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      res.sendStatus(500);
    }
  },

  getPendingSessions: async (req, res) => {
    try {
      const currentTime = new Date().toISOString();
      // const currentTime = '2023-06-09T03:00:00.000Z';

      const pendingSessions = await Booking.find({
        bookingTime: { $gte: currentTime },
      });

      res.json({ pendingSessions });
    } catch (error) {
      res.sendStatus(500);
    }
  },
};

module.exports = { deanController };
