import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import Joi from 'joi';
@Injectable()
export class UpdatePasswordValidationBody implements PipeTransform {
  constructor(private readonly schema: Joi.ObjectSchema) {}
  async transform(value: any) {
    try {
      await this.schema.validateAsync(value, { abortEarly: false });
    } catch (error) {
      if (error.details && Array.isArray(error.details)) {
        const validationErrors = error.details.map((detail) => ({
          field: detail.path.join('.'),
          message: detail.message,
        }));
        throw new BadRequestException(validationErrors);
      }
    }
    return value;
  }
}
