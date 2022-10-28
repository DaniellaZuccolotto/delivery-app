const cors = require('cors');
const express = require('express');
const { loginRouter } = require('../routes');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.send('pegouuu'));
app.use('/login', loginRouter);

module.exports = app;
