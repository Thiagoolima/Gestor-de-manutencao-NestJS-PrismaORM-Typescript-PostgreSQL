import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDTO } from './dto/auth.dto';
import { AuthService } from './services/auth.service';
import { EmailExistsInterceptor } from '../user/interceptor/email-exists.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseInterceptors(EmailExistsInterceptor)
  async executeLogin(@Body() data: LoginDTO) {
    return await this.authService.login(data);
  }
  @Get('activateaccount')
  async executeActivation(@Query('token') token: string) {
    return await this.authService.activateNewUser(token);
  }
}
