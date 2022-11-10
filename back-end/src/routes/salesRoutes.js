const { Router } = require('express');
const { salesController } = require('../controllers');
const authMiddleware = require('../middlewares/verifyToken');

const salesRouter = Router();

salesRouter.get('/', salesController.getOrders);
salesRouter.get('/sales', salesController.getSaleProducts);
salesRouter.get('/:id', salesController.getOrderById);
salesRouter.post('/', authMiddleware.validateToken, salesController.registerOrders);
salesRouter.put('/:id', salesController.updateSaleStatus);

module.exports = salesRouter;