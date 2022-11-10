const { users } = require('../database/models');

const getUsers = async () => {
  const result = await users.findAll();
  if (!result) return { code: 404, message: 'Not found' };
  return { code: 200, data: result };
};

module.exports = { getUsers };
