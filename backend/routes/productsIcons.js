const express = require('express');
const { getProductsIcons } = require('../controllers/productsIconsController');

const router = express.Router();

/**
 * @swagger
 * /products-icons:
 *   get:
 *     summary: Retrieve all product icons
 *     description: Fetch a list of product icons from the database.
 *     tags: 
 *       - Products
 *     responses:
 *       200:
 *         description: List of product icons retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "65af4b92e3b2c4a7b8912456"
 *                   name:
 *                     type: string
 *                     example: "JavaScript Icon"
 *                   url:
 *                     type: string
 *                     example: "https://cdn.icons.com/javascript.png"
 *       404:
 *         description: No product icons found
 *       500:
 *         description: Internal server error
 */
router.get('/', getProductsIcons);

module.exports = router;