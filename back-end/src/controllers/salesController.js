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

const getOrderById = async (_req = Request, res = Response) => {
  const { id } = _req.params;
  const orders = await salesService.getOrderById(id);
  return res.status(200).json(orders);
};  

const getSaleProducts = async (_req = Request, res = Response) => {
  const orders = await salesService.getSaleProducts();
  return res.status(200).json(orders);
};

const updateSaleStatus = async (req = Request, res = Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const sale = await salesService.updateSaleStatus(id, status);

  return res.status(200).json(sale);
};

module.exports = { registerOrders, getOrders, getOrderById, getSaleProducts, updateSaleStatus };
