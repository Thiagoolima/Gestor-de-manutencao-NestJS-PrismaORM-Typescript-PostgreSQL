import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaService } from 'src/configs/database/prisma.service';
import { AuthRepository } from './repositories/auth.repository';
import { UserPrismaRepository } from 'src/modules/user/prisma/user.prisma.repository';
import { UserRepository } from '../user/repositories/user.repository';
import { SendMail } from 'src/utils/sendMail.utils';
import { TransporterNodemailer } from 'src/configs/nodemailer/transporter.nodemailer';
import { CompileHandlebars } from 'src/configs/handlebars/compile.handlbers';
import { AuthPrismaRepository } from './prisma/auth.prisma.repository';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    {
      provide: AuthRepository,
      useClass: AuthPrismaRepository,
    }, //Auth module shares emailsExists interceptor with user module. Because of this, importing the user repository is necessary.
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
    TransporterNodemailer,
    SendMail,
    CompileHandlebars,
  ],
})
export class AuthModule {}
