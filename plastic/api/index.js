const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/transactions', require('./transactions'))

module.exports = apiRouter;