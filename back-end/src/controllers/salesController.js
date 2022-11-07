const { Request, Response } = require('express');
const { salesService } = require('../services');

const registerOrders = async (req = Request, res = Response) => {
  const { bodyProducts, bodySales } = req.body;
  const order = await salesService.registerOrders(bodyProducts, bodySales);

  return res.status(201).json(order);
};

const getOrders = async (_req = Request, res = Response) => {
  const orders = await salesService.getOrders();

  return res.status(200).json(orders);
};

const getSaleProcudts = async (_req = Request, res = Response) => {
  const orders = await salesService.getSaleProcudts();

  return res.status(200).json(orders);
};

module.exports = { registerOrders, getOrders, getSaleProcudts };