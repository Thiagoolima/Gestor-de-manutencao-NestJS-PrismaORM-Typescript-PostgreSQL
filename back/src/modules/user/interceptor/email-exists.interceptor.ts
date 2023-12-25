import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
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
    if (req.path === '/api/user/newuser') {
      if (emailExists) {
        throw new BadRequestException('Email already exists');
      }
    }
    if (req.path === '/api/auth/login') {
      if (!emailExists) {
        throw new BadRequestException('The email provided was not found');
      }
    }
    return next.handle();
  }
}
