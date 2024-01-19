import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ManagerFiles } from 'src/configs/aws/sdk-s3.config';
import { FileDTO } from '../dto/file.dto';
import { SendMail } from 'src/utils/sendMail.utils';
import { Request } from 'express';

@Injectable()
export class NewUserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private managerFiles: ManagerFiles,
    private sendMail: SendMail,
  ) {}
  async createUser(data: CreateUserDTO, req: Request, files?: Array<FileDTO>) {
    const password = await bcrypt.hash(data.password, 10);
    const token = await this.jwtService.sign({
      name: data.name,
      email: data.email,
    });
    let url = null;
    if (files.length >= 1) {
      url = await this.managerFiles.uploadFile(files);
    }
    const options = {
      to: data.email,
      name: data.name,
      subject: 'Ative sua conta!',
      templatePath: './src/templates/account-activate.template.html',
      activationLink: `${req.protocol}://${req.headers.host}/api/auth/activateaccount?token=${token}`,
    };
    await this.sendMail.execute(options);
    return await this.userRepository.createUser({
      ...data,
      password,
      activation_token: token,
      url_img_profile: url,
    });
  }
}
