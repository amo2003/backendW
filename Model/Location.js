const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  userId: { type: String, required: true },   // Asgardeo sub claim
  city: { type: String, required: true },
  country: { type: String, default: 'LK' },
  lat: Number,
  lon: Number,
  savedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Location', locationSchema);
