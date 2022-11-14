const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const registerNewSale = async (newSale) => {
  const productsList = await Promise.all(newSale
    .map(({ productId }) => productsModel.findById(productId)));
  console.log(productsList);
  const notFoundProducts = productsList.some((product) => product.length === 0);
  if (notFoundProducts) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const response = await salesModel.registerNewSale(newSale);

  return { type: null, message: { id: response, itemsSold: newSale } };
};

module.exports = {
  registerNewSale,
};