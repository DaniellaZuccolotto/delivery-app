const { Router } = require('express');
const { registerController } = require('../controllers');

const registerRouter = Router();

registerRouter.post('/', registerController.createUser);
registerRouter.get('/sellers', registerController.getSellers);

module.exports = registerRouter;
