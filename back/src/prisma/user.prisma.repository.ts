import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/configs/database/prisma.service';
import {
  CreateUserDTO,
  EmailDTO,
  UserCreatedDTO,
} from 'src/modules/user/dto/user.dto';
import { UserRepository } from 'src/modules/user/repositories/user.repository';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  async findEmail(data: EmailDTO): Promise<UserCreatedDTO | null> {
    return await this.prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });
  }
  async create(data: CreateUserDTO): Promise<UserCreatedDTO> {
    return await this.prisma.users.create({
      data,
    });
  }
}
