import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaService } from 'src/configs/database/prisma.service';
import { UserRepository } from '../user/repositories/user.repository';
import { UserPrismaRepository } from 'src/prisma/user.prisma.repository';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class AuthModule {}
