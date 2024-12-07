const express = require('express');
const router = express.Router();
const { submitRequest } = require('../controllers/submitController');

router.post('/', submitRequest);

module.exports = router;

// submit-request