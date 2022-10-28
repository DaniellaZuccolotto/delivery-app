const { sign } = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const createToken = (user) => {
  const jwtConfig = { expiresIn: '30d', algorithm: 'HS256' };
  const token = sign({ ...user }, JWT_SECRET, jwtConfig);
  return token;
};

module.exports = createToken;