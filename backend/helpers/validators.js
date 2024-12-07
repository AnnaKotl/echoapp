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
    .pattern(/^[\s\S]{4,20}$/)
    .required(),
  email: Joi.string().email().required(),
  socialNetwork: Joi.string()
    .allow('')
    .optional(),
  country: Joi.string().min(2).max(50).required(),
  city: Joi.string().min(2).max(50).optional(),
  selectedService: Joi.string()
    .valid(
      'IOS-app-1',
      'IOS-app-2',
      'IOS-app-3',
      'IOS-app-4',
      'IOS-app-5',
      'IOS-app-6'
    )
    .required(),
  message: Joi.string().max(2000).allow('').optional(),
});

const validators = (data) => {
  console.log('Validating data:', data);  // LOG ----------------------------- > DELETE after DEV
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
