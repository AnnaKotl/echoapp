const { Request } = require('../models/Request');

const checkSecret = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Unauthorized: missing header' });

  const token = authHeader.split(' ')[1];
  if (token !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ message: 'Unauthorized: invalid key' });
  }

  next();
};

const adminPanel = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { checkSecret, adminPanel };
