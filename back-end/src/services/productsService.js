const { products } = require('../database/models');

const getProducts = async () => {
  const product = await products.findAll();
  if (!product) return { code: 404, message: 'products not found' };
  return { code: 200, product };
};

module.exports = { getProducts };