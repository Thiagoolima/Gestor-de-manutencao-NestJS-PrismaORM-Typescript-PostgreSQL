import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class EmailExistsInterceptor implements NestInterceptor {
  constructor(private userRepository: UserRepository) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const emailExists = await this.userRepository.findEmail(req.body);
    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }
    return next.handle();
  }
}
