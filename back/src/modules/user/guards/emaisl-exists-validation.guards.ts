import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { Request } from 'express';

@Injectable()
export class EmailExistsGuard implements CanActivate {
  constructor(private userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    console.log(req);
    return true;
  }
}
