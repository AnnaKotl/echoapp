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
  