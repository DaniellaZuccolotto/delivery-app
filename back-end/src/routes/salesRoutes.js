const { Router } = require('express');
const { salesController } = require('../controllers');
const authMiddleware = require('../middlewares/verifyToken');

const salesRouter = Router();

salesRouter.get('/', salesController.getOrders);
<<<<<<< customer-order-details
salesRouter.get('/:id', salesController.getOrderById);
=======
salesRouter.get('/sales', salesController.getSaleProcudts);
>>>>>>> main-group-2-dev
salesRouter.post('/', authMiddleware.validateToken, salesController.registerOrders);

module.exports = salesRouter;