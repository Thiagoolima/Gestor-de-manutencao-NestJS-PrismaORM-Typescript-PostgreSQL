import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from '../dto/auth.dto';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userREpository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async login(data: LoginDTO) {
    const { id, name, email, password, url_img_profile, active } =
      await this.userREpository.findEmail(data);
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
}
