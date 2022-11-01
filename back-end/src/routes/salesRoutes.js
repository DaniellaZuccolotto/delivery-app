const { Router } = require('express');

const salesRouter = Router();

salesRouter.post('/', salesController.registerSale);

module.exports = salesRouter;