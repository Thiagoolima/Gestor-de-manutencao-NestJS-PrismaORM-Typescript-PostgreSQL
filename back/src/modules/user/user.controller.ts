import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  Req,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { NewUserService } from './services/user.service';
import { FileDTO } from './dto/file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateUserValidationBody } from './pipes/create-user-validation-body.pipe';
import { createUserSchema } from './schemas/create-user.schema';
import { EmailExistsInterceptor } from './interceptor/email-exists.interceptor';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly newUserService: NewUserService) {}
  @Post('newuser')
  @UseInterceptors(FilesInterceptor('profilePicture'), EmailExistsInterceptor)
  @UsePipes(new CreateUserValidationBody(createUserSchema))
  async create(
    @Body() data: CreateUserDTO,
    @UploadedFiles() files: Array<FileDTO>,
    @Req() req: Request,
  ) {
    return await this.newUserService.createUser(data, req, files);
  }
}
