const productsModel = require('../models/products.model');

const getAll = async () => {
  const response = await productsModel.getAll();
  return { type: null, message: response };
};

const findById = async (productId) => {
  const response = await productsModel.findById(productId);
  if (!response) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: response };
};

const createNewProduct = async (newProduct) => {
  const response = await productsModel.createNewProduct(newProduct);
  return { type: null, message: response };
};

module.exports = {
  getAll,
  findById,
  createNewProduct,
};