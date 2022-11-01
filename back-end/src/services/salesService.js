const { Sales } = require('../database/models');

const getOrders = async () => {
  const orders = await Sales.findAll();

  return orders;
}; 

const registerOrders = async (infosOrder) => {
  const order = await Sales.create(infosOrder);

  return order;
};

module.exports = { getOrders, registerOrders };