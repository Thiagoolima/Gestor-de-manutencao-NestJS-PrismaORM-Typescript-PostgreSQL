import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/configs/database/prisma.service';
import {
  FindEmailDTO,
  ResetPasswordDTO,
  SetNewPasswordDTO,
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
  async newResetPassword(data: ResetPasswordDTO): Promise<UserCreatedDTO> {
    return await this.prisma.users.update({
      where: { id: data.id },
      data: { recovery_pass_token: data.recovery_pass_token },
    });
  }
  async updateActiveUser(data: UpdateActivateUserDTO): Promise<UserCreatedDTO> {
    return await this.prisma.users.update({
      where: { id: data.id, activation_token: data.activation_token },
      data: { active: true, activation_token: null },
    });
  }
  async setNewPassword(data: SetNewPasswordDTO): Promise<void> {
    await this.prisma.users.update({
      where: { id: data.id },
      data: {
        password: data.password,
        recovery_pass_token: data.recovery_pass_token,
      },
    });
  }
}
