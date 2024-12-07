const express = require('express');
const multer = require('multer');
const { uploadImage, deleteTempFile } = require('../services/cloudinaryService');

const upload = multer({ dest: 'temp/' });
const router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
  const filePath = req.file.path;

  try {
    const imageUrl = await uploadImage(filePath, 'admin_assets');
    deleteTempFile(filePath);
    res.status(200).json({ success: true, imageUrl });
  } catch (error) {
    deleteTempFile(filePath);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

// POST http://localhost:5001/upload
// Headers:
// Content-Type: multipart/form-data
// Body: form-data.
// Key: image (File).
// Value: add your file

// Upload successful: {
//   asset_id: 'dbdf91d975e16e22c6147d4dbd4f4df7',
//   public_id: 'admin_assets/l2dxyigwr1xh15v1vwug',
//   version: 1731940181,
//   version_id: '92c54104ad87705d943b82bbdd69b2a9',
//   signature: 'a7022dd0537b5d247ad7df55491c6d0b54a83768',
//   width: 2708,
//   height: 2611,
//   format: 'png',
//   resource_type: 'image',
//   created_at: '2024-11-18T14:29:41Z',
//   tags: [],
//   bytes: 878744,
//   type: 'upload',
//   etag: 'e44c4550365cd32c6acd862c16148d94',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/dv10ghdyb/image/upload/v1731940181/admin_assets/l2dxyigwr1xh15v1vwug.png',
//   secure_url: 'https://res.cloudinary.com/dv10ghdyb/image/upload/v1731940181/admin_assets/l2dxyigwr1xh15v1vwug.png',
//   asset_folder: 'admin_assets',
//   display_name: 'l2dxyigwr1xh15v1vwug',
//   original_filename: 'f3389817f63872d4a1dd6b56aae635d2',
//   api_key: '737843112698572'
// }
// POST /upload 200 2486.020 ms - 129
