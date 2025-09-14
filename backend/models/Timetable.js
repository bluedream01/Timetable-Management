const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  studentPhone: String, // identify student by phone number
  date: String,         // store date as YYYY-MM-DD
  classes: [
    {
      subject: String,
      time: String, // "HH:MM" format
      room: String,
    },
  ],
});
module.exports = mongoose.model('Timetable', timetableSchema);
