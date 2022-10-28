const { Router } = require('express');
const { registerController } = require('../controllers');

const registerRouter = Router();

registerRouter.post('/', registerController.createUser);

module.exports = registerRouter;
