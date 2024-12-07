const express = require('express');
const router = express.Router();
const {
  getAllServices,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');

// GET 
router.get('/', getAllServices);

// POST
router.post('/', createService);

// PUT
router.put('/:serviceId', updateService);

// DEL
router.delete('/:serviceId', deleteService);

module.exports = router;

// PRICES