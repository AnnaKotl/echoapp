// const express = require('express');
// const { checkSecret } = require('../controllers/adminController');
// const { Request } = require('../models/Request');

// const router = express.Router();

// router.get('/requests', checkSecret, async (req, res) => {
//   const requests = await Request.find().sort({ createdAt: -1 });
//   res.json(requests);
// });

// router.delete('/requests/:id', checkSecret, async (req, res) => {
//   const { id } = req.params;
//   await Request.findByIdAndDelete(id);
//   res.json({ message: 'Request deleted' });
// });

// module.exports = router;

const express = require('express');
const { Request } = require('../models/Request');

const router = express.Router();

// middleware для перевірки Authorization
router.use((req, res, next) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  if (token !== process.env.VITE_SECRET_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
});

// GET /admin/requests
router.get('/requests', async (req, res) => {
  const requests = await Request.find().sort({ createdAt: -1 });
  res.json(requests);
});

// DELETE /admin/requests/:id
router.delete('/requests/:id', async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;
