const router = require('express').Router();
const { deleteCachedData } = require('../config/cache');

/**
 * Admin authentication middleware (Bearer token)
 */
const adminAuth = (req, res, next) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  if (!token || token !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Unauthorized: invalid token' });
  }
  next();
};

/**
 * @swagger
 * /admin/cache/{key}:
 *   delete:
 *     summary: Clear cached data by key
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Cache key to delete
 *     responses:
 *       200:
 *         description: Cache cleared successfully
 */
router.delete('/cache/:key', adminAuth, async (req, res) => {
  try {
    await deleteCachedData(req.params.key);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Failed to clear cache' });
  }
});

module.exports = router;
