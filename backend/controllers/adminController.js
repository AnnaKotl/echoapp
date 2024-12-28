const secretKey = process.env.ADMIN_SECRET;

const checkSecret = (req, res, next) => {
  const { secret } = req.query;
  
  console.log(`Received secret: ${secret}`);
  console.log(`Received secret: ${secret}, Expected secret: ${secretKey}`);

  if (secret !== secretKey) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

const adminPanel = (req, res) => {
  res.render('admin');
};

module.exports = { checkSecret, adminPanel };