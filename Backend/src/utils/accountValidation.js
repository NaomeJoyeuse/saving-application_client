// const Joi = require('joi');

// const createAccountSchema = Joi.object({
//   userId: Joi.string().uuid().required(),
// });

// module.exports = { createAccountSchema };


const depositValidator = (data) => {
  const { amount, description } = data;

  if (!amount) {
    throw new Error('Amount is required');
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new Error('Amount must be greater than 0');
  }

  if (description && typeof description !== 'string') {
    throw new Error('Description must be text');
  }

  return { amount: parsedAmount, description };
};

const withdrawValidator = (data) => {
  const { amount, description } = data;

  if (!amount) {
    throw new Error('Amount is required');
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new Error('Amount must be greater than 0');
  }

  if (description && typeof description !== 'string') {
    throw new Error('Description must be text');
  }

  return { amount: parsedAmount, description };
};

module.exports = { depositValidator, withdrawValidator };