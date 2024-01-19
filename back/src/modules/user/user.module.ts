import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { NewUserService } from './services/user.service';
import { PrismaService } from 'src/configs/database/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { UserPrismaRepository } from 'src/modules/user/prisma/user.prisma.repository';
import { ManagerFiles } from 'src/configs/aws/sdk-s3.config';
import { SendMail } from 'src/utils/sendMail.utils';
import { TransporterNodemailer } from 'src/configs/nodemailer/transporter.nodemailer';
import { CompileHandlebars } from 'src/configs/handlebars/compile.handlbers';

@Module({
  imports: [],
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
    CompileHandlebars,
  ],
})
export class UserModule {}
