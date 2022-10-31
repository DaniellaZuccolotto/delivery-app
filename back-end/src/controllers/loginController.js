const { Request, Response } = require('express');
const { loginService } = require('../services');

const login = async (req = Request, res = Response) => {
  const { code, data } = await loginService.login(req.body);
  return res.status(code).json({ data });
};

module.exports = { login };