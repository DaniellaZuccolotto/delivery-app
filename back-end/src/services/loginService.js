const md5 = require('md5');
const { users } = require('../database/models');
const createToken = require('../utils/createToken');

const login = async ({ email: emailR, password }) => {
  const result = await users.findOne({ where: { email: emailR } });
  if (!result) return { code: 404, message: 'Not found' };
  if (result.dataValues.password !== md5(password)) { 
    return { code: 401, message: 'Incorrect password' }; 
  }
  const { role, name, email, id } = result.dataValues;
  const token = createToken(result.dataValues);
  const retorno = { id, name, email, role, token };
  return { code: 200, data: retorno };
};

module.exports = { login };
