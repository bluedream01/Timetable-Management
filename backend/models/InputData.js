// models/InputData.js
const mongoose = require("mongoose");

const InputDataSchema = new mongoose.Schema({
  classrooms: Number,
  batches: Number,
  maxClassesPerDay: Number,
  maxClassesPerWeek: Number,
  fixedSlots: [String],
  subjects: [String],
  faculty: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("InputData", InputDataSchema);
