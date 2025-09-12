const mongoose = require('mongoose');

const TimeSlotSchema = new mongoose.Schema({
  startTime: String,
  endTime: String,
  subject: String,
  faculty: String,
  room: String,
  batch: String
});

const TimetableSchema = new mongoose.Schema({
  name: String,
  department: { type: String, enum: ['CS', 'ECE', 'EEE'] },
  status: { type: String, enum: ['draft', 'under-review', 'finalized'], default: 'draft' },
  schedule: {
    monday: [TimeSlotSchema],
    tuesday: [TimeSlotSchema],
    wednesday: [TimeSlotSchema],
    thursday: [TimeSlotSchema],
    friday: [TimeSlotSchema],
    saturday: [TimeSlotSchema]
  },
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Timetable', TimetableSchema);
