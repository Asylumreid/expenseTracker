const express = require('express');
const userRoutes = express.Router();
const userController = require('./userController');
const { user } = require('../../config/config');

userRoutes.get('/', userController.getUser);

userRoutes.post('/login', userController.login);

userRoutes.post('/register', userController.createUser)

userRoutes.post('/', userController.updateUser);

userRoutes.put('/:id', userController.updateUser);

userRoutes.delete('/:id', userController.deleteUser);

module.exports = userRoutes;