const { Request, Response } = require('express');
const { registerService } = require('../services');

const createUser = async (req = Request, res = Response) => {
  const { code, message } = await registerService.createUser(req.body);
  return res.status(code).json(message);
};

const getSellers = async (_req = Request, res = Response) => {
  const { code, message, sellers } = await registerService.getSellers();

  if (message) return res.status(code).json(message);

  return res.status(code).json(sellers);
};

const deleteUser = async (req = Request, res = Response) => {
  const { email } = req.body;
  const { code, message } = await registerService.deleteUser(email);
  return res.status(code).json({ message });
};

module.exports = { createUser, getSellers, deleteUser };
