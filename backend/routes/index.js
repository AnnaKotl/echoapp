const express = require('express');
const router = express.Router();

const contactRoutes = require('./contact');
const productsIconsRoutes = require('./productsIcons');
const servicesRoutes = require('./services');
const submitRoutes = require('./submit-form');
const uploadRoutes = require('./upload');
const iconsRoutes = require('./icons');
const adminPageRoutes = require('./adminPage');
const adminApiRoutes = require('./admin');
const adminCacheRoutes = require('./adminCache');

// Public API
router.use('/contact', contactRoutes);
router.use('/products-icons', productsIconsRoutes);
router.use('/services', servicesRoutes);
router.use('/submit', submitRoutes);
router.use('/upload', uploadRoutes);
router.use('/icons', iconsRoutes);

// Admin
router.use('/pages/admin', adminPageRoutes);
router.use('/admin', adminApiRoutes);
router.use('/admin/cache', adminCacheRoutes);

module.exports = router;