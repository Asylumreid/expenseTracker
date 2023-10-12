const express = require('express');
const apiV1Router = express.Router();
const transactionRoutes = require('./transactions/transactionRoute');
const userRoutes = require('./user/userRoute');

apiV1Router.use('/transactions', transactionRoutes);
apiV1Router.use('/user', userRoutes);

module.exports = apiV1Router;
