const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, enum: ['admin', 'teacher', 'student'] },
  department: { type: String, enum: ['CS', 'ECE', 'EEE'], required: false },
  language: { type: String, default: 'en' }
});

module.exports = mongoose.model('User', UserSchema);
