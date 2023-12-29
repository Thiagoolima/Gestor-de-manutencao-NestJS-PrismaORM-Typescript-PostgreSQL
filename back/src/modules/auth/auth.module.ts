import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaService } from 'src/configs/database/prisma.service';
import { AuthRepository } from './repositories/auth.repository';
import { AuthPrismaRepository } from 'src/prisma/auth.prisma.repository';
import { UserPrismaRepository } from 'src/prisma/user.prisma.repository';
import { UserRepository } from '../user/repositories/user.repository';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    {
      provide: AuthRepository,
      useClass: AuthPrismaRepository,
    },
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class AuthModule {}
