const modelProducts = require('../database/models/product');

const getProducts = async () => {
  const products = await modelProducts.findAll();

  if (!products) return { code: 404, message: 'products not found' };

  return products;
};

module.exports = { getProducts };