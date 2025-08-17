const express = require('express');
const { Request } = require('../models/Request');
const ArchivedRequest = require('../models/ArchivedRequest');

const router = express.Router();

router.use((req, res, next) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');

  if (token !== process.env.ADMIN_SECRET_KEY) {
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
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Not found' });

    await ArchivedRequest.create(request.toObject());
    await Request.findByIdAndDelete(req.params.id);

    res.json({ message: 'Archived and removed from active list' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;
