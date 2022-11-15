const express = require('express');
const validations = require('../middlewares/validations');
const salesController = require('../controllers/sales.controller');

const salesRouter = express.Router();

salesRouter.post('/', validations.validateNewSale, salesController.registerNewSale);

salesRouter.get('/', salesController.getSales);

salesRouter.get('/:id', salesController.getSaleById);

salesRouter.delete('/:id', salesController.deleteSale);

module.exports = salesRouter;