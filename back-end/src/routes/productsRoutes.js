const { Router } = require('express');
const { productsController } = require('../controllers');
const authMiddleware = require('../middleware/verifyToken');

const productsRouter = Router();

productsRouter.get('/', authMiddleware.validateToken, productsController.getProducts);

module.exports = productsRouter;
