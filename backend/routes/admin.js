const express = require('express');
const { Request } = require('../models/Request');
const ArchivedRequest = require('../models/ArchivedRequest');
const router = express.Router();

/**
 * Middleware: Admin authentication via POST token (Bearer)
 */
const adminAuth = (req, res, next) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  if (!token || token !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: '🚫 Unauthorized: invalid token' });
  }
  next();
};

/**
 * @swagger
 * /admin/requests:
 *   get:
 *     summary: Get all active requests
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of requests
 */
router.get('/requests', adminAuth, async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 }).lean();
    const requestsWithDate = requests.map(r => {
      if (!r.createdAt) r.createdAt = r._id.getTimestamp();
      return r;
    });
    res.json(requestsWithDate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '🛑 Server error' });
  }
});

/**
 * @swagger
 * /admin/requests/{id}:
 *   delete:
 *     summary: Archive and delete a request
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Request ID to delete
 *     responses:
 *       200:
 *         description: Request archived and removed
 *       404:
 *         description: Request not found
 */
router.delete('/requests/:id', adminAuth, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Not found' });

    await ArchivedRequest.create(request.toObject());
    await Request.findByIdAndDelete(req.params.id);

    res.json({ message: 'Archived and removed from active list' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '🛑 Delete failed' });
  }
});

module.exports = router;
