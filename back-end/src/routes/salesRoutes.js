const { Router } = require('express');
const { salesController } = require('../controllers');
const authMiddleware = require('../middlewares/verifyToken');

const salesRouter = Router();

salesRouter.get('/', salesController.getOrders);
salesRouter.get('/sales', salesController.getSaleProcudts);
salesRouter.post('/', authMiddleware.validateToken, salesController.registerOrders);

module.exports = salesRouter;