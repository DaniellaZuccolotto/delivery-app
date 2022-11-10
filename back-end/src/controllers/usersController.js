const { Request, Response } = require('express');
const { usersService } = require('../services');

const getUsers = async (_req = Request, res = Response) => {
  const result = await usersService.getUsers();
  return res.status(result.code).json(result.data);
};

module.exports = { getUsers };
