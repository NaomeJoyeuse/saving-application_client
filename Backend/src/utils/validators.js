const Joi = require('joi');

const Validators = {
  registerUser: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters',
      'any.required': 'Password is required',
    }),
    fullName: Joi.string().required().messages({
      'any.required': 'Full name is required',
    }),
    deviceId: Joi.string().required().messages({
      'any.required': 'Device ID is required',
    }),
  }),

  loginUser: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    deviceId: Joi.string().required(),
  }),

  adminLogin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  deposit: Joi.object({
    amount: Joi.number().positive().required(),
    description: Joi.string().optional(),
  }),

  withdraw: Joi.object({
    amount: Joi.number().positive().required(),
    description: Joi.string().optional(),
  }),
};

module.exports = { Validators };