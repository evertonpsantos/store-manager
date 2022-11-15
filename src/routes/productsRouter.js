const express = require('express');
const productsController = require('../controllers/products.controller');
const validations = require('../middlewares/validations');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);

productsRouter.post('/', validations.validateName, productsController.createNewProduct);

productsRouter.get('/:id', productsController.findById);

productsRouter.put('/:id', validations.validateName, productsController.updateProduct);

productsRouter.delete('/:id', productsController.deleteProduct);

module.exports = productsRouter;