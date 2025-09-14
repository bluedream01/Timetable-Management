const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const inputDataRoutes = require("./routes/inputData");
const smsRoutes = require("./routes/timetables"); // ✅ add your Twilio SMS routes
const twilio = require("twilio");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for JSON payloads
app.use(express.urlencoded({ extended: false })); // for Twilio x-www-form-urlencoded

// Twilio client (useful if you need to send SMS directly from here)
const twilioClient = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const twilioPhone = process.env.TWILIO_PHONE;

// ✅ Export Twilio client if needed in routes
app.set("twilioClient", twilioClient);
app.set("twilioPhone", twilioPhone);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/input-data", inputDataRoutes);
app.use("/api/sms", smsRoutes); // ✅ Twilio webhook + update route

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
