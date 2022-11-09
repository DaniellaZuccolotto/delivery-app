const { sales, salesProduct, products } = require('../database/models');

const getOrders = async () => {
  const orders = await sales.findAll();
  return orders;
};

const getSaleProducts = async () => {
  const orders = await sales.findAll({ 
    include: { model: products, as: 'products' },
   });
  return orders;
};

const getOrderById = async (id) => {
  const orders = await sales.findOne({
    where: { id },
    include: { model: products, as: 'products' },
  });
  return orders;
};

const registerOrders = async (bodyProducts, bodySales) => {
  const order = await sales.create(bodySales);
  const { id } = order.dataValues;
  const productsObj = bodyProducts.productId.map((product, index) => ({
    saleId: id,
    productId: product,
    quantity: bodyProducts.quantity[index],
  }));
  const createProducts = productsObj.map((product) => salesProduct.create(product));
  const result = await Promise.all(createProducts);
  const salesProducts = result.map((product) => product.dataValues);
  return { orders: order.dataValues, salesProducts };
};

const updateSaleStatus = async (id, status) => {
   await sales.update({ status }, { where: { id } });
   
   const sale = await sales.findOne({
    where: { id },
    include: { model: products, as: 'products' },
  });
   
   return sale;
};

module.exports = { getOrders, registerOrders, getOrderById, getSaleProducts, updateSaleStatus };
