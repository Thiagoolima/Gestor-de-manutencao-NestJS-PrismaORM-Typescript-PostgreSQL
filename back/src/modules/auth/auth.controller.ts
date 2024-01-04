import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import {
  LoginDTO,
  RecoveryPasswordDTO,
  SetNewPasswordDTO,
} from './dto/auth.dto';
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

  @Post('setnewpassword')
  async executeSetNewPass(
    @Body() data: SetNewPasswordDTO,
    @Headers('authorization') bearerToken: string,
  ) {
    return await this.authService.setNewPassword(data, bearerToken);
  }
}
