import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { NewUserService } from './services/user.service';
import { FileDTO } from './dto/file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateUserValidationBody } from './pipes/create-user-validation-body.pipe';
import { createUserSchema } from './schemas/create-user.schema';
import { EmailExistsInterceptor } from './interceptor/email-exists.interceptor';

@Controller('/user')
export class UserController {
  constructor(private readonly newUserService: NewUserService) {}
  @Post()
  @UseInterceptors(FilesInterceptor('profilePicture'), EmailExistsInterceptor)
  @UsePipes(new CreateUserValidationBody(createUserSchema))
  async create(
    @Body() data: CreateUserDTO,
    @UploadedFiles() files: Array<FileDTO>,
  ) {
    return await this.newUserService.createUser(data, files);
  }
}