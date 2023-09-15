const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const deanRouter = require("./routes/deanRoutes");
const studentRouter = require("./routes/studentRoutes");
const { scheduleSessions } = require("./sessionScheduler");

dotenv.config();

const app = express();
const port = 8080;

app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(cookieParser());

const URI = process.env.DB_URI;

mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello world!");
});

scheduleSessions();

app.use("/dean", deanRouter);
app.use("/student", studentRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
