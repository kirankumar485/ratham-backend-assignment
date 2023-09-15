const schedule = require("node-schedule");
const { Session } = require("./models/session");

// Function to create sessions at 10 AM on Thursday and Friday
const createSessions = async () => {
  const daysOfWeek = [4, 5]; // Thursday: 4, Friday: 5

  for (const day of daysOfWeek) {
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = day;
    rule.hour = 10;
    rule.minute = 0;

    const nextInvocation = schedule.scheduleJob(rule, () => {});
    const nextDate = nextInvocation.nextInvocation();

    const session = new Session({
      time: `${nextDate.toISOString()}`,
    });

    try {
      await session.save();
      console.log(`Session created for ${schedule.RecurrenceRule.toString()}`);
    } catch (error) {
      console.error("Error creating session:", error);
    }
  }
};

// Schedule session creation every week
const scheduleSessions = () => {
  // Schedule to run every Sunday at 12:00 AM
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = 0; // Sunday
  rule.hour = 0;
  rule.minute = 0;

  // Schedule session creation function
  schedule.scheduleJob(rule, createSessions);
};

module.exports = { scheduleSessions };
