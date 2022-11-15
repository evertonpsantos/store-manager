const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const registerNewSale = async (newSale) => {
  const productsList = await Promise.all(newSale
    .map(({ productId }) => productsModel.findById(productId)));
  const notFoundProducts = productsList
    .some((product) => product === undefined || product.length === 0);
  if (notFoundProducts) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const response = await salesModel.registerNewSale(newSale);

  return { type: null, message: { id: response, itemsSold: newSale } };
};

const getSales = async () => {
  const result = await salesModel.getSales();
  return { type: null, message: result };
};

const getSaleById = async (saleId) => {
  const result = await salesModel.getSaleById(saleId);
  if (!result.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: result }; 
};

const deleteSale = async (saleId) => {
  const saleFound = await salesModel.getSaleById(saleId);
  if (!saleFound.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  await salesModel.deleteSale(saleId);
  return { type: null, message: '' };
};

module.exports = {
  registerNewSale,
  getSales,
  getSaleById,
  deleteSale,
};