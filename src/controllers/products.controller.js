const productsService = require('../services/products.service');
const errorMap = require('../utils/errorMap');

const getAll = async (_req, res) => {
  const { type, message } = await productsService.getAll();
  if (type) return res.status(400).json({ message });
  res.status(200).json(message);
};

const findById = async (req, res) => {
  const productId = req.params.id;
  const { type, message } = await productsService.findById(productId);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

module.exports = {
  getAll,
  findById,
};