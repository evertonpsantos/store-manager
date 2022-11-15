const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const registerNewSale = async (newSale) => {
  console.log(newSale);
  const productsList = await Promise.all(newSale
    .map(({ productId }) => productsModel.findById(productId)));
  console.log(productsList);
  const notFoundProducts = productsList.some((product) => product === undefined);
  console.log(notFoundProducts);
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
  if (result.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: result }; 
};

module.exports = {
  registerNewSale,
  getSales,
  getSaleById,
};