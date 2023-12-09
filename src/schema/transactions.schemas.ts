import joi from 'joi';

export const transactionSchema = joi.object({
  value: joi.number().required().min(1),
  description: joi.string().required(),
});
