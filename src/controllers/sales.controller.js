const errorMap = require('../utils/errorMap');
const salesService = require('../services/sales.service');

const registerNewSale = async (req, res) => {
  const newSale = req.body;
  const { type, message } = await salesService.registerNewSale(newSale);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message);
};

const getSales = async (_req, res) => {
  const { type, message } = await salesService.getSales();
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const saleId = req.params.id;
  const { type, message } = await salesService.getSaleById(saleId);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

module.exports = {
  registerNewSale,
  getSales,
  getSaleById,
};