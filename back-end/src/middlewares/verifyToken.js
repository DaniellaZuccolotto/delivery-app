const jwt = require('jsonwebtoken');

const jwtKey = require('fs')
  .readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    
    try {
      const payload = jwt.verify(token, jwtKey);
      req.user = payload;
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = {
    validateToken,
};