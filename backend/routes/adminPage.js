const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  const secret = req.query.secret;

  if (process.env.NODE_ENV === 'production') {
    if (secret !== process.env.ADMIN_SECRET_KEY) {
      return res.redirect('/'); 
      // return res.status(401).send('Unauthorized: invalid secret');
    }
  }

  res.sendFile(path.join(__dirname, './frontend/dist/pages/admin.html'));
  // res.sendFile(path.join(__dirname, '../../frontend/dist/pages/admin.html'));
});

module.exports = router;