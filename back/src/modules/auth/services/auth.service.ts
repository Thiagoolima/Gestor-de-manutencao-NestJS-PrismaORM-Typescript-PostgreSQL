import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO, RecoveryPasswordDTO } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../repositories/auth.repository';
import { SendMail } from 'src/utils/sendMail.utils';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private sendMail: SendMail,
  ) {}
  async login(data: LoginDTO) {
    const { id, name, email, password, url_img_profile, active } =
      await this.authRepository.findEmail(data);
    if (!active) {
      throw new UnauthorizedException(
        'Unable to log in. The account is not activated. Please activate your account to proceed.',
      );
    }
    const passVerify = await bcrypt.compare(data.password, password);
    if (!passVerify) {
      throw new UnauthorizedException(
        "Invalid credentials. The provided password does not match the user's password.",
      );
    }
    const payload = {
      id,
      name,
      email,
    };
    const accessToken = this.jwtService.sign(payload);
    return {
      ...payload,
      url_img_profile,
      accessToken,
    };
  }
  async activateNewUser(token: any) {
    try {
      const { email } = await this.jwtService.verify(token);
      const findUser = await this.authRepository.findEmail(email);
      if (findUser.active) {
        throw new BadRequestException('User has already been activated');
      }
      if (findUser.activation_token !== token) {
        throw new BadRequestException('invalid or altered token');
      }
      await this.authRepository.updateActive(
        {
          id: findUser.id,
          activation_token: token,
        },
        { active: true },
      );
    } catch (error) {
      if (
        error.name === 'JsonWebTokenError' ||
        error.name === 'TokenExpiredError'
      ) {
        throw new UnauthorizedException(
          'Sorry, the activation link is invalid or has expired.',
        );
      }
      throw error;
    }
  }
  async resetPasswordRequest(data: RecoveryPasswordDTO, req: Request) {
    const user = await this.authRepository.findEmail(data);
    if (user) {
      const { id, name } = user;
      const recoveryToken = this.jwtService.sign(
        { id, name },
        { expiresIn: '15m' },
      );
      await this.sendMail.execute({
        to: data.email,
        name: name,
        subject: 'Recuperação de senha!',
        templatePath: './src/templates/recovery-password.template.html',
        resetPasswordLink: `${req.protocol}://${req.headers.host}/api/auth/recoverypassword?token=${recoveryToken}`,
      });
    }
    return {
      message:
        'Verifique a caixa de entrada do seu e-mail! Se o endereço de e-mail fornecido estiver associado a uma conta, você receberá um e-mail para recuperação de sua senha de acesso!',
    };
  }
  async setNewPassword(token: string) {
    const teste = this.jwtService.verify(token);
    console.log(teste);
  }
}
