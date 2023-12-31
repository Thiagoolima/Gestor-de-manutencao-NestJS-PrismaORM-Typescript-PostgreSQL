import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDTO, RecoveryPasswordDTO } from './dto/auth.dto';
import { AuthService } from './services/auth.service';
import { EmailExistsInterceptor } from '../user/interceptor/email-exists.interceptor';
import { Request } from 'express';

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

  @Post('recoverypassword')
  async executeRecovery(
    @Body() data: RecoveryPasswordDTO,
    @Req() req: Request,
  ) {
    return await this.authService.resetPasswordRequest(data, req);
  }

  @Post('recoverypassword')
  async executeUpdatePass(
    @Body() data: RecoveryPasswordDTO,
    @Req() req: Request,
  ) {
    return await this.authService.resetPasswordRequest(data, req);
  }

  @Get('recoverypassword')
  async executeSetPass(@Query('token') token: string) {
    return await this.authService.setNewPassword(token);
  }
}
