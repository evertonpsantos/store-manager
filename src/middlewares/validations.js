const { validateNewProductSchema } = require('./schema');

const validateName = (req, res, next) => {
  const newProduct = req.body;

  const { error } = validateNewProductSchema.validate(newProduct);
  if (error.details[0].type === 'any.required') {
    return res.status(400).json({ message: error.details[0].message });
  }
  if (error.details[0].type === 'string.min') {
    return res.status(422).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateName,
};
