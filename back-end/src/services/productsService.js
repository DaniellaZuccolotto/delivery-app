const { Product } = require('../database/models');

const getProducts = async () => {
  const products = await Product.findAll();

  if (!products) return { code: 404, message: 'products not found' };
  return { code: 200, products };
};

module.exports = { getProducts };