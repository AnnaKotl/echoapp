const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');

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