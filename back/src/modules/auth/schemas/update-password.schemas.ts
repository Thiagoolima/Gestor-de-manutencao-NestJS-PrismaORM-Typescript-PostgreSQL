import Joi from 'joi';

export const UpdatePasswordSchema = Joi.object({
  password: Joi.string().min(6).alphanum().required().messages({
    'any.required': 'Password is required!',
    'string.min': 'Password must have at least 6 characters!',
    'string.alphanum': 'Password must consist of letters and numbers!',
  }),
});
