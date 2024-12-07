const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/', contactController.createContactRequest);

module.exports = router;

// POST http://localhost:5001/contact
// Body -> raw -> JSON

// {
//     "name": "John Doe",
//     "email": "johndoe@example.com",
//     "mobileNumber": "+1234567890",
//     "selectedService": "IOS-app-1",
//     "socialNetwork": "Facebook",
//     "country": "USA",
//     "city": "New York",
//     "message": "This is a test message"
//   }
// {
//     "message": "Contact request submitted successfully",
//     "newRequest": {
//       "name": "John Doe",
//       "email": "johndoe@example.com",
//       "mobileNumber": "+1234567890",
//       "selectedService": "IOS-app-1",
//       "socialNetwork": "Facebook",
//       "country": "USA",
//       "city": "New York",
//       "message": "This is a test message",
//       "createdAt": "2024-11-13T12:34:56.789Z",
//       "_id": "someMongoID"
//     }
//   }
  