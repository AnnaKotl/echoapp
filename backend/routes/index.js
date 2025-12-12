const express = require('express');
const router = express.Router();
const path = require('path');

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
router.use('/submit-request', submitRoutes);
router.use('/upload', uploadRoutes);
router.use('/icons', iconsRoutes);

// Admin API routes
router.use('/admin', adminApiRoutes);
router.use('/admin/cache', adminCacheRoutes);

// Home page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'dist', 'index.html'));
});

// Portfolio routes - serve portfolio pages
router.get('/portfolio', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'dist', 'portfolio.html'));
});

router.get('/portfolio/:page', (req, res) => {
  const { page } = req.params;
  const validPages = ['cleaning-app', 'e-commerce', 'food-drink'];
  
  if (!validPages.includes(page)) {
    return res.status(404).json({ message: 'Portfolio page not found' });
  }
  
  // Convert kebab-case to camelCase for file mapping
  const fileMap = {
    'cleaning-app': 'cleaningApp',
    'e-commerce': 'eCommerce',
    'food-drink': 'foodDrink'
  };
  
  const fileName = fileMap[page];
  res.sendFile(path.join(__dirname, '../..', 'dist', `${fileName}.html`));
});

// Admin page - clean URL
router.get('/admin-panel', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'dist', 'admin.html'));
});

// Legacy admin route for backward compatibility
router.use('/pages/admin', adminPageRoutes);

module.exports = router;