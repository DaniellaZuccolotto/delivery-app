const cors = require('cors');
const express = require('express');
const { loginRouter, registerRouter, productsRouter,
  salesRouter, usersRouter } = require('../routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public')); 

app.get('/coffee', (_req, res) => res.send('pegouuu'));
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/products', productsRouter);
app.use('/orders', salesRouter);
app.use('/users', usersRouter);

module.exports = app;
