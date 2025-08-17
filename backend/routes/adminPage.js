const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  const secret = req.query.secret || '';
  
  if (secret !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).send('Unauthorized');
  }

  res.sendFile(path.join(__dirname, '../frontend/dist/pages/admin.html'));
});

module.exports = router;
