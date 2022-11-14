const Joi = require('joi');

const validateNewProductSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
  'string.empty': '{#label} cannot be an empty field',
  'string.min': '{#label} length must be at least {#limit} characters long',
  'any.required': '{#label} is required',
}),
});

const newSaleSchema = Joi.array().items(Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
}).required().messages({
    'number.min': '{#label} must be greater than or equal to {#limit}',
    'any.required': '{#label} is required',
  }));

module.exports = {
  validateNewProductSchema,
  newSaleSchema,
};