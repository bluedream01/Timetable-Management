const express = require("express");
const router = express.Router();
const Timetable = require("../models/Timetable"); // Mongoose model
const twilio = require("twilio");

// 🔹 Admin updates timetable + sends SMS notification
router.post("/update", async (req, res) => {
  try {
    const { studentPhone, date, classes } = req.body;

    // Save or update timetable
    const timetable = await Timetable.findOneAndUpdate(
      { studentPhone, date },
      { classes },
      { upsert: true, new: true }
    );

    // Build SMS body with updated classes
    let smsBody = `📅 Timetable Updated for ${date}\n`;
    classes.forEach(c => {
      smsBody += `${c.time} - ${c.subject} (${c.room})\n`;
    });
    smsBody += `\nReply 1 for next class, 2 for full timetable.`;

    // Use Twilio client from server.js
    const client = req.app.get("twilioClient");
    const twilioPhone = req.app.get("twilioPhone");

    // Send SMS notification
    await client.messages.create({
      body: smsBody,
      from: twilioPhone,
      to: studentPhone
    });

    res.json({ success: true, message: "Timetable updated & SMS sent ✅", timetable });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Webhook: student replies with "1" or "2"
router.post("/sms-reply", async (req, res) => {
  const twiml = new twilio.twiml.MessagingResponse();

  try {
    const incomingMsg = req.body.Body?.trim();

    // Get today's date in local timezone (India for you)
    const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

    // ✅ Just find today's timetable (ignore phone number)
    const timetable = await Timetable.findOne({ date: today });

    let replyText = "Reply 1 for next class, 2 for today's timetable.";

    if (timetable) {
      if (incomingMsg === "1") {
        const now = new Date();

        const nextClass = timetable.classes.find(c => {
          const [h, m] = c.time.split(":").map(Number);
          const classTime = new Date();
          classTime.setHours(h, m, 0, 0);
          return classTime > now;
        });

        replyText = nextClass
          ? `Next class: ${nextClass.subject} at ${nextClass.time} in ${nextClass.room}`
          : "No more classes today.";
      } else if (incomingMsg === "2") {
        replyText = "Today's Timetable:\n";
        timetable.classes.forEach(c => {
          replyText += `${c.time} - ${c.subject} (${c.room})\n`;
        });
      }
    } else {
      replyText = "No timetable found for today.";
    }

    twiml.message(replyText);
    res.type("text/xml").send(twiml.toString());
  } catch (err) {
    console.error(err);
    twiml.message("Error processing request.");
    res.type("text/xml").send(twiml.toString());
  }
});


module.exports = router;
