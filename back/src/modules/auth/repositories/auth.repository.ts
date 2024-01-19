import { UserCreatedDTO } from 'src/modules/user/dto/user.dto';
import {
  FindEmailDTO,
  ResetPasswordDTO,
  SetNewPasswordDTO,
  UpdateActivateUserDTO,
  UserFoundDTO,
} from '../dto/auth.dto';

export abstract class AuthRepository {
  abstract findEmail(data: FindEmailDTO): Promise<UserFoundDTO | null>;
  abstract newResetPassword(data: ResetPasswordDTO): Promise<UserCreatedDTO>;
  abstract updateActiveUser(
    data: UpdateActivateUserDTO,
  ): Promise<UserCreatedDTO>;
  abstract setNewPassword(data: SetNewPasswordDTO): Promise<void>;
}
