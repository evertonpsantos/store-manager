const express = require('express');
const productsController = require('../controllers/products.controller');
const { validateName } = require('../middlewares/validations');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);

productsRouter.post('/', validateName, productsController.createNewProduct);

productsRouter.get('/:id', productsController.findById);

module.exports = productsRouter;