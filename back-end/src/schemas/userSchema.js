const joi = require('joi');

const userSchema = joi.object().keys({
  name: joi
    .string()
    .required()
    .empty('')
    .min(12)
    .messages({
      'any.required': '400|"name" is required',
      'any.empty': '400|"name" cannot be empty',
      'string.min': '400|"name" length must be at least 12 characters long',
    }),
    email: joi
    .string()
    .required()
    .empty('')
    .email()
    .messages({
      'any.required': '400|"email" is required',
      'any.empty': '400|"email" cannot be empty',
      'string.email': '400|"email" must be a valid email',
    }),
    password: joi
    .string()
    .required()
    .empty('')
    .messages({
      'any.required': '400|"password" is required',
      'any.empty': '400|"password" cannot be empty',
      'string.max': '400|"password" length must be at most 6 characters long',
    }),
    role: joi
    .string()
    .required()
    .empty('')
    .messages({
      'any.required': '400|"role" is required',
      'any.empty': '400|"role" cannot be empty',
    }),
});

module.exports = userSchema;
