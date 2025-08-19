export default function adminAuth(req, res, next) {
    
  if (process.env.NODE_ENV === 'production') {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token || token !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: 'Forbidden: Invalid admin secret' });
    }
  }
  next();
}