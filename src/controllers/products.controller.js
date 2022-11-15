const productsService = require('../services/products.service');
const errorMap = require('../utils/errorMap');

const getAll = async (_req, res) => {
  const { message } = await productsService.getAll();
  res.status(200).json(message);
};

const findById = async (req, res) => {
  const productId = req.params.id;
  const { type, message } = await productsService.findById(productId);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const createNewProduct = async (req, res) => {
  const newProduct = req.body;
  const { message } = await productsService.createNewProduct(newProduct);
  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const newInfo = req.body;
  const productId = req.params.id;
  const { type, message } = await productsService.updateProduct(newInfo, productId);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const { type, message } = await productsService.deleteProduct(productId);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(204).json();
};

module.exports = {
  getAll,
  findById,
  createNewProduct,
  updateProduct,
  deleteProduct,
};