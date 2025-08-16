const express = require('express');
const { checkSecret, adminPanel } = require('../controllers/adminController');
const router = express.Router();

router.get('/requests', checkSecret, adminPanel);

module.exports = router;