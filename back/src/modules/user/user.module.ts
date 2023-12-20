import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { NewUserService } from './services/user.service';
import { PrismaService } from 'src/configs/database/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { UserPrismaRepository } from 'src/prisma/user.prisma.repository';
import { JwtModule } from '@nestjs/jwt';
import { ManagerFiles } from 'src/configs/aws/sdk-s3.config';
import { SendMail } from 'src/utils/sendMail.utils';
import { TransporterNodemailer } from 'src/configs/nodemailer/transporter.nodemailer';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'asd125@d4%$%31as',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    ManagerFiles,
    NewUserService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
    TransporterNodemailer,
    SendMail,
  ],
})
export class UserModule {}
