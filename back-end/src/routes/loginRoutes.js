const { Router } = require('express');
const { loginController } = require('../controllers');

const loginRouter = Router();

loginRouter.post('/', loginController.login);

module.exports = loginRouter;