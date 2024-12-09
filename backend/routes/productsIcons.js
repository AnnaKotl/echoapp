const express = require('express');
const { getProductsIcons } = require('../controllers/productsIconsController');

const router = express.Router();

router.get('/', getProductsIcons);

module.exports = router;