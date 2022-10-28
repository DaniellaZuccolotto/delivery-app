const md5 = require('md5');
const { User } = require('../database/models');
const createToken = require('../utils/createToken');

const login = async ({ email, password }) => {
  const result = await User.findOne({ where: { email } });
  if (!result) return { code: 404, message: 'Not found' };
  if (result.dataValues.password !== md5(password)) { 
    return { code: 401, message: 'Incorrect password' }; 
  }
  const token = createToken(result.dataValues);
  return { code: 200, data: token };
};

module.exports = { login };
