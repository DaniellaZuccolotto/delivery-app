const { Sales, SalesProducts } = require('../database/models');

const getOrders = async () => {
  const orders = await Sales.findAll();

  return orders;
}; 

const getOrderById = async (id) => {
    const orders = await Sales.findOne({ where: { id } });
  
    return orders;
};

const registerOrders = async (bodyProducts, bodySales) => {
  const order = await Sales.create(bodySales);
  const { id } = order.dataValues;
  const products = bodyProducts.productId.map((product, index) => ({
    saleId: id,
    productId: product,
    quantity: bodyProducts.quantity[index],
  }));
  const createProducts = products.map((product) => SalesProducts.create(product));
  const result = await Promise.all(createProducts);
  const salesProducts = result.map((product) => product.dataValues);
  return { orders: order.dataValues, salesProducts };
};

module.exports = { getOrders, registerOrders, getOrderById };