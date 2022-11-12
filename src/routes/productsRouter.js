const express = require('express');
const productsController = require('../controllers/products.controller');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);

productsRouter.post('/', productsController.createNewProduct);

productsRouter.get('/:id', productsController.findById);

module.exports = productsRouter;