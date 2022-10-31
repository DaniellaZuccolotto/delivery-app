const cors = require('cors');
const express = require('express');
const { loginRouter, registerRouter, productsRouter } = require('../routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public')); 
// app.use('/images', express.static('images'));

app.get('/coffee', (_req, res) => res.send('pegouuu'));
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/products', productsRouter);

module.exports = app;
