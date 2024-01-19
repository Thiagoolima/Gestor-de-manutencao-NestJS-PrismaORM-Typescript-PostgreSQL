import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required!',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required!',
    'string.email': 'Email must be valid!',
  }),
  password: Joi.string().min(6).alphanum().required().messages({
    'any.required': 'Password is required!',
    'string.min': 'Password must have at least 6 characters!',
    'string.alphanum': 'Password must consist of letters and numbers!',
  }),
});
