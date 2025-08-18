const mongoose = require('mongoose');

const archivedRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileNumber: String,
  selectedService: String,
  socialNetwork: String,
  country: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ArchivedRequest', archivedRequestSchema);
