const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Create a contact request
 *     description: Submits a contact form from the user.
 *     tags: 
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: "User Name"
 *               email:
 *                 type: string
 *                 example: "some-email@gmail.com"
 *               message:
 *                 type: string
 *                 example: "I would like to know more about your services."
 *     responses:
 *       200:
 *         description: Contact request successfully created
 *         content:
 *           application/json:
 *             example:
 *               message: "Contact request submitted successfully."
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
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
  