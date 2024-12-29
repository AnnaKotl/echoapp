const Joi = require('joi');

const capitalizeName = (name) => {
  return name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
};

const formValidationSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .custom((value, helpers) => capitalizeName(value)),
    mobileNumber: Joi.string()
    .min(5)
    .pattern(/^[\d\s()+\-]{5,}$/)
    .required(),
  email: Joi.string().email().required(),
  socialNetwork: Joi.string()
    .allow('')
    .optional(),
  country: Joi.string().min(2).max(50).required(),
  selectedService: Joi.string()
    .valid(
      'Basic', 'Standard', 'Pro', 'Premium', 'Enterprise'
    )
    .required(),
  message: Joi.string().max(2000).allow('').optional(),
});

const validators = (data) => {
  // console.log('Validating data:', data);
  const { error, value } = formValidationSchema.validate(data, {
    abortEarly: false,
  });

  if (error) {
    console.log('Validation error details:', error.details);
    const message = error.details.map((detail) => detail.message).join(', ');
    throw new Error(message);
  }
  return value;
};

module.exports = validators;