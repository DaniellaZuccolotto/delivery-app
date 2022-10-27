const { User } = require('../database/models');
const createToken = require('../utils/createToken');

login = async ({ email, password }) => {
  const { dataValues } = await User.findOne({ where: { email } });
  if (!dataValues) return { code: 401, message: 'Incorrect email' };
  if (dataValues.password !== password) return { code: 401, message: 'Incorrect password' };
  const token = createToken(dataValues);
  return { code: 200, data: token };
};

module.exports = { login };
