const { Router } = require('express');
const { productsController } = require('../controllers');
const authMiddleware = require('../middlewares/verifyToken');

const productsRouter = Router();

productsRouter.get('/', authMiddleware.validateToken, productsController.getProducts);

module.exports = productsRouter;
