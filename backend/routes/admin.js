const express = require('express');
const { checkSecret, adminPanel } = require('../controllers/adminController');
const router = express.Router();

router.get('/admin', checkSecret, adminPanel);

module.exports = router;