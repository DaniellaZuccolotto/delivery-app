const { Request, Response } = require('express');
const { salesService } = require('../services')

const registerOrders = async (req = Request, res=  Response) => {
  const { bodyProducts, bodySales } = req.body;
  const order = await salesService.registerOrders(bodyProducts, bodySales);

  return res.status(201).json(order)
};

const getOrders = async (req=  Request, res= Response) => {
  const orders = await salesService.getOrders();

  return res.status(200).json(orders);
};

module.exports = { registerOrders, getOrders };