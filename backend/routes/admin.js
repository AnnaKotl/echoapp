const express = require('express');
const { checkSecret, adminPanel } = require('../controllers/adminController');
const router = express.Router();

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Access to the admin panel
 *     description: This endpoint allows the user to access the admin panel if they provide the correct secret key.
 *     parameters:
 *       - name: secret
 *         in: query
 *         description: Secret key to access the admin panel
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully accessed the admin panel
 *       401:
 *         description: Unauthorized - Invalid or missing secret key
 *       500:
 *         description: Server error
 */

router.get('/admin', checkSecret, adminPanel);

module.exports = router;