import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/configs/database/prisma.service';
import {
  FindEmailDTO,
  UpdateActivateUserDTO,
} from 'src/modules/auth/dto/auth.dto';
import { AuthRepository } from 'src/modules/auth/repositories/auth.repository';
import { UserCreatedDTO } from 'src/modules/user/dto/user.dto';

@Injectable()
export class AuthPrismaRepository implements AuthRepository {
  constructor(private prisma: PrismaService) {}
  async findEmail(data: FindEmailDTO): Promise<UserCreatedDTO | null> {
    return await this.prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });
  }
  async updateActive(
    where: UpdateActivateUserDTO,
    data: any,
  ): Promise<UserCreatedDTO> {
    return await this.prisma.users.update({
      where,
      data,
    });
  }
}
