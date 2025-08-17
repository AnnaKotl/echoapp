const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');

  if (token !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).send('Unauthorized');
  }

  res.sendFile(path.join(__dirname, '../frontend/dist/pages/admin.html'));
});

module.exports = router;
