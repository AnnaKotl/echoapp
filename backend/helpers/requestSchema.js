const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: 3,
    maxlength: 50
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    validate: {
      validator: (v) => /^(?:\+?380\d{9}|\d{10})$/.test(v),
      message: 'Mobile number must be in a valid format: +380XXXXXXXXX or 0XXXXXXXXXX'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: (v) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v),
      message: 'Invalid email format'
    }
  },
  socialNetwork: {
    type: String,
    maxlength: 100,
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    minlength: 2,
    maxlength: 50
  },
  selectedService: {
    type: String,
    required: [true, 'Selected service is required'],
    enum: ['Basic',
      'Standard',
      'Pro',
      'Premium',
      'Enterprise']
  },
  message: {
    type: String,
    maxlength: 2000
  }
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;