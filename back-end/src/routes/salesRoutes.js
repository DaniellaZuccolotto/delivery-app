const { Router } = require('express');
const { salesController } = require('../controllers/')

const salesRouter = Router();

salesRouter.get('/', salesController.getOrders);
salesRouter.post('/', salesController.registerOrders);

module.exports = salesRouter;