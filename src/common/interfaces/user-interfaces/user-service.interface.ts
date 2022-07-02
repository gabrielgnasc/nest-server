import { User } from '../../../modules/user/domain/User.entity';
import { UpdateUserDTO, CreateUserDTO, UpdatePasswordDTO } from '../../dtos/user';
import { IUserFindBy } from './user-findby.interface';
export abstract class IUserService {
  abstract create(createUser: CreateUserDTO): Promise<User>;

  abstract update(id: string, user: UpdateUserDTO): Promise<User>;

  abstract findById(id: string): Promise<User>;

  abstract updatePassword(id: string, user: UpdatePasswordDTO): Promise<void>;

  abstract recoverPassword(email: string): Promise<string>;

  abstract findBy(data?: IUserFindBy): Promise<User>;
}
