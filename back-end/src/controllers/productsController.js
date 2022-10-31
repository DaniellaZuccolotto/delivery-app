const { Request, Response } = require('express');
const productsService = require('../services/productsService');

const getProducts = async (_req = Request, res = Response) => {
    const { code, message, products } = await productsService.getProducts();
   
    if (message) return res.status(code).json({ message });

    return res.status(code).json(products);
};

module.exports = { getProducts };