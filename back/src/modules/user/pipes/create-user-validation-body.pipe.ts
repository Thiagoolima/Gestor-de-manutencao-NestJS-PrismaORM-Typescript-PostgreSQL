import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/user.dto';
import * as Joi from 'joi';
@Injectable()
export class CreateUserValidationBody implements PipeTransform {
  constructor(private readonly schema: Joi.ObjectSchema) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
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
    }
    return value;
  }
}
