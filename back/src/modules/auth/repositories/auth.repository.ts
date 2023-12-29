import { UserCreatedDTO } from 'src/modules/user/dto/user.dto';
import { FindEmailDTO, UpdateActivateUserDTO } from '../dto/auth.dto';

export abstract class AuthRepository {
  abstract findEmail(data: FindEmailDTO): Promise<UserCreatedDTO | null>;
  abstract updateActive(data: UpdateActivateUserDTO): Promise<UserCreatedDTO>;
}
