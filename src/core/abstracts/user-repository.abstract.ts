import { UserDTO } from '../../common/dtos/user/user.dto';

export abstract class IUserRepository {
  abstract findAll(): Promise<UserDTO[]>;

  abstract find(id: string): Promise<UserDTO>;

  abstract create(item: UserDTO): Promise<UserDTO>;

  abstract update(id: string, item: UserDTO): Promise<UserDTO>;

  abstract delete(id: string): Promise<void>;
}
