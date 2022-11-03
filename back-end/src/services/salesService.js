const { Sales } = require('../database/models');

const getOrders = async () => {
  const orders = await Sales.findAll();

  return orders;
}; 

const registerOrders = async (bodyProducts, bodySales) => {
  const order = await Sales.create(bodySales);
  
  return order.dataValues;
};

module.exports = { getOrders, registerOrders};