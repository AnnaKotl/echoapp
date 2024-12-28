const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');

/**
 * @swagger
 * /icons:
 *   get:
 *     summary: Get all icons from Cloudinary
 *     description: Retrieve a list of icons stored in the Cloudinary folder 'site_icons'.
 *     tags:
 *       - Icons
 *     responses:
 *       200:
 *         description: A list of icons fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 icons:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         example: "https://res.cloudinary.com/demo/image/upload/v1700000000/site_icons/icon1.png"
 *                       id:
 *                         type: string
 *                         example: "site_icons/icon1"
 *       500:
 *         description: Internal server error, failed to fetch icons
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch icons"
 */
router.get('/', async (req, res) => {
  try {
    const resources = await cloudinary.search
      .expression('folder:site_icons')
      .sort_by('public_id', 'asc')
      .execute();

    const icons = resources.resources.map((file) => ({
      url: file.secure_url,
      id: file.public_id,
    }));

    res.status(200).json({ success: true, icons });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch icons' });
  }
});

module.exports = router;

// GET http://localhost:5001/icons
// {
//   "success": true,
//   "icons": [
//       {
//           "url": "https://res.cloudinary.com/dv10ghdyb/image/upload/v1733409392/aiplantcoin-first-screen_mibsqn.svg",
//           "id": "aiplantcoin-first-screen_mibsqn"
//       }
//   ]
// }

// GET https://res.cloudinary.com/dv10ghdyb/image/upload/v1733409392/aiplantcoin-first-screen_mibsqn.svg
// SOME_ICONS.svg