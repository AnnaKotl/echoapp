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
      validator: (v) => /^[\d]{3}[-\s]?[\d]{3}[-\s]?[\d]{3,4}$/.test(v),
      message: 'Please enter a valid mobile number, at least 5 digits long'
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


const Request = mongoose.models.Request || mongoose.model('Request', requestSchema);

module.exports = Request;