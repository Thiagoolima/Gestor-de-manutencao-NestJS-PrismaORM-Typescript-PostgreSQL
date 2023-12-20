import { CreateUserDTO, EmailDTO, UserCreatedDTO } from '../dto/user.dto';

export abstract class UserRepository {
  abstract findEmail(data: EmailDTO): Promise<UserCreatedDTO | null>;
  abstract create(data: CreateUserDTO): Promise<UserCreatedDTO>;
}
