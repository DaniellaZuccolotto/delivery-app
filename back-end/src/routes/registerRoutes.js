const { Router } = require('express');
const { registerController } = require('../controllers');
const authMiddleware = require('../middlewares/verifyToken');

const registerRouter = Router();

registerRouter.post('/', registerController.createUser);
registerRouter.get('/sellers', registerController.getSellers);
registerRouter.post('/adm', authMiddleware.validateToken, registerController.createUser);

module.exports = registerRouter;
