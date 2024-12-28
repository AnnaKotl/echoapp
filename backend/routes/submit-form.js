const express = require('express');
const router = express.Router();
const { submitRequest } = require('../controllers/submitController');

/**
 * @swagger
 * /submit-form:
 *   post:
 *     summary: Submit a request form
 *     description: Endpoint to submit user requests or feedback.
 *     tags:
 *       - Forms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Anna Kotliar"
 *               email:
 *                 type: string
 *                 example: "Kotlyaranya1771@gmail.com"
 *               message:
 *                 type: string
 *                 example: "I would like to know more about your services."
 *     responses:
 *       200:
 *         description: Form submitted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Form submitted successfully"
 *       400:
 *         description: Bad request - Validation error
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid input data"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Server error"
 */
router.post('/', submitRequest);

module.exports = router;


// submit-request