const errorMap = require('../utils/errorMap');
const salesService = require('../services/sales.service');

const registerNewSale = async (req, res) => {
  const newSale = req.body;
  const { type, message } = await salesService.registerNewSale(newSale);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message);
};

module.exports = {
  registerNewSale,
};