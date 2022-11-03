const { Request, Response } = require('express');
const { salesService } = require('../services')

const registerOrders = async (req = Request, res=  Response) => {
  await salesService.registerOrders(req.body);

  res.status(201).json({ message: 'create succefully' })
};

const getOrders = async (req=  Request, res= Response) => {
  const orders = await salesService.getOrders();

  return res.status(200).json(orders);
};

module.exports = { registerOrders, getOrders };