const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  contact: String,
  otp: String,
  createdAt: { type: Date, default: Date.now, expires: 300 }
});

module.exports = mongoose.model('User', userSchema);