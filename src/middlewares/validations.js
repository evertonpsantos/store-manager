const schemas = require('./schema');

const { validateNewProductSchema, newSaleSchema } = schemas; 

const validateName = (req, res, next) => {
  const newProduct = req.body;

  const { error } = validateNewProductSchema.validate(newProduct);
  if (error) {
      if (error.details[0].type === 'any.required') {
    return res.status(400).json({ message: error.details[0].message });
  }
  if (error.details[0].type === 'string.min') {
    return res.status(422).json({ message: error.details[0].message });
  }
  }
  next();
};

const validateNewSale = (req, res, next) => {
  const newSale = req.body;
  const { error } = newSaleSchema.validate(newSale);
    
  if (error) {
    if (error.details[0].type === 'any.required') {
      return res.status(400).json({ message: error.details[0].message.replace(/(\[.*?\])./, '') });
    }
      
    if (error.details[0].type === 'number.min') {
      return res.status(422).json({ message: error.details[0].message.replace(/(\[.*?\])./, '') });
    }
  }

  next();
};

module.exports = {
  validateName,
  validateNewSale,
};
