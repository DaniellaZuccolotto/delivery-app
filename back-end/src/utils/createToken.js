const { sign } = require('jsonwebtoken');
require('dotenv').config();

const jwtKey = require("fs")
  .readFileSync("jwt.evaluation.key", { encoding: "utf-8" });

const createToken = (user) => {
  const jwtConfig = { expiresIn: '30d', algorithm: 'HS256' };
  const token = sign({ ...user }, jwtKey, jwtConfig);
  return token;
};

module.exports = createToken;