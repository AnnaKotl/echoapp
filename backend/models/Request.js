const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  mobileNumber: { type: String, required: true, trim: true },
  selectedService: { type: String, required: true, trim: true },
  socialNetwork: { type: String, trim: true },
  country: { type: String, required: true, trim: true },
  message: { type: String, trim: true, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const Request = mongoose.models.Request || mongoose.model('Request', requestSchema);

module.exports = { Request };