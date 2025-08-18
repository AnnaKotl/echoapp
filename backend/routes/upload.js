const express = require('express');
const multer = require('multer');
const { uploadImage, deleteTempFile } = require('../services/cloudinaryService');
const cache = require('../config/cache');

const upload = multer({ dest: 'temp/' });
const router = express.Router();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload an image to Cloudinary
 *     description: Uploads an image to Cloudinary under the 'products-icons' folder and clears the product icons cache.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: image
 *         in: formData
 *         description: The image file to upload.
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Successfully uploaded the image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 imageUrl:
 *                   type: string
 *                   example: 'https://res.cloudinary.com/dohnlnvbt/image/upload/v1755525792/products-icons/example.png'
 *       500:
 *         description: Failed to upload image
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
 *                   example: 'Failed to upload image'
 */

router.post('/', upload.single('image'), async (req, res) => {
  const filePath = req.file.path;

  try {
    const imageUrl = await uploadImage(filePath, 'products-icons');
    deleteTempFile(filePath);

    await cache.setCachedData('products-icons', null);

    res.status(200).json({ success: true, imageUrl });
  } catch (error) {
    deleteTempFile(filePath);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;