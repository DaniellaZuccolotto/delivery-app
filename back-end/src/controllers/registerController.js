const { Request, Response } = require('express');
const { registerService } = require('../services');

const createUser = async (req = Request, res = Response) => {
  const { code, message } = await registerService.createUser(req.body);
  return res.status(code).json({ message });
};

module.exports = { createUser };
