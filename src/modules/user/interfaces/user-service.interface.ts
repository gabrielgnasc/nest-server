import { CreateUserDTO } from '../../../common/dtos/user/create-user.dto';
import { UserDTO } from '../../../common/dtos/user/user.dto';
import { User } from '../domain/User.entity';

export abstract class IUserService {
  abstract create(createUser: CreateUserDTO): Promise<UserDTO>;

  abstract update(id: string, user: any): Promise<UserDTO>;

  abstract findById(id: string): Promise<UserDTO>;

  abstract updatePassword(id: string, user: any): Promise<void>;

  abstract recoverPassword(email: string): Promise<string>;
}
