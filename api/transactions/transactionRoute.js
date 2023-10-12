const express = require('express');
const transactionRoutes = express.Router();
const transactionController = require('./transactionController.js');

transactionRoutes.get('/', transactionController.getTransactions);

transactionRoutes.post('/', transactionController.createTransaction);

transactionRoutes.put('/', transactionController.updateTransaction);

transactionRoutes.delete('/', transactionController.deleteTransaction);

module.exports = transactionRoutes;
// let n = {
//     "uid": 1,
//     "name": 'Test',
//     "transactionType": 1,
//     "category": 'Test Cat',
//     "date": '2023-10-11',
//     "amount": 100,
// };
