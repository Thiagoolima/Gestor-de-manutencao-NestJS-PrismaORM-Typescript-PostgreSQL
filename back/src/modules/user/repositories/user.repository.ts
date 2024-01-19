import { CreateUserDTO, EmailDTO, UserCreatedDTO } from '../dto/user.dto';

export abstract class UserRepository {
  abstract findEmail(data: EmailDTO): Promise<UserCreatedDTO | null>;
  abstract createUser(data: CreateUserDTO): Promise<UserCreatedDTO>;
}
