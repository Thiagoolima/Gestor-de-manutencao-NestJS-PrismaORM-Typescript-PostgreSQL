import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { LoginDTO } from './dto/auth.dto';
import { AuthService } from './services/auth.service';
import { EmailExistsInterceptor } from '../user/interceptor/email-exists.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseInterceptors(EmailExistsInterceptor)
  async execute(@Body() data: LoginDTO) {
    return await this.authService.login(data);
  }
}
