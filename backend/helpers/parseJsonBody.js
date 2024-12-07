const parseJsonBody = (req, res, next) => {
    try {
      req.body = JSON.parse(req.body);
      next();
    } catch (err) {
      next(new Error('Invalid JSON format'));
    }
  };
  
  module.exports = parseJsonBody;