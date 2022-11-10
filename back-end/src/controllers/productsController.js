const { Request, Response } = require('express');
const productsService = require('../services/productsService');

const getProducts = async (_req = Request, res = Response) => {
    const { code, message, product } = await productsService.getProducts(); 
    if (message) return res.status(code).json({ message });
    return res.status(code).json(product);
};

module.exports = { getProducts };