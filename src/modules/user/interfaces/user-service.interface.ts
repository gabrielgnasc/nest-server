import { UpdateUserDTO, CreateUserDTO, UserDTO, UpdatePasswordDTO } from '../../../common/dtos/user';
export abstract class IUserService {
  abstract create(createUser: CreateUserDTO): Promise<UserDTO>;

  abstract update(id: string, user: UpdateUserDTO): Promise<UserDTO>;

  abstract findById(id: string): Promise<UserDTO>;

  abstract updatePassword(id: string, user: UpdatePasswordDTO): Promise<void>;

  abstract recoverPassword(email: string): Promise<string>;
}
