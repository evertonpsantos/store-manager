const Joi = require('joi');

const validateNewProductSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
  'string.empty': '{#label} cannot be an empty field',
  'string.min': '{#label} length must be at least {#limit} characters long',
  'any.required': '{#label} is required',
}),
});

module.exports = {
  validateNewProductSchema,
};