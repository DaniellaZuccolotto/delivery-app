const { Router } = require('express');
const { usersController } = require('../controllers');
const authMiddleware = require('../middlewares/verifyToken');

const usersRouter = Router();

usersRouter.get('/', authMiddleware.validateToken, usersController.getUsers);

module.exports = usersRouter;
