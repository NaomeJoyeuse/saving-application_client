const Joi = require('joi');

const createAccountSchema = Joi.object({
  userId: Joi.string().uuid().required(),
});

module.exports = { createAccountSchema };
