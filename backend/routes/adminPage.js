const express = require('express');
const path = require('path');
const router = express.Router();

/**
 * @swagger
 * /pages/admin/login:
 *   post:
 *     summary: Admin login
 *     description: Provide password to receive access token
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "supersecret"
 *     responses:
 *       200:
 *         description: Access granted, token returned
 *       401:
 *         description: Invalid password
 */
router.post('/login', (req, res) => {
  const { password } = req.body;

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: '🚫 Unauthorized: invalid password' });
  }

  res.json({ token: process.env.ADMIN_PASSWORD });
});

/**
 * @swagger
 * /pages/admin:
 *   get:
 *     summary: Serve admin panel HTML
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Admin page served
 */
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/pages/admin.html'));
});

module.exports = router;