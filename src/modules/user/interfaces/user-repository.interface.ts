import { CreateUserDTO } from '../../../common/dtos/user/create-user.dto';
import { UpdateUserDTO } from '../../../common/dtos/user/update-user.dto';
import { User } from '../domain/User.entity';
import { IUserFindBy } from './user-findby.interface';

export abstract class IUserRepository {
  abstract findAll(userFindBy?: IUserFindBy): Promise<User[]>;

  abstract find(id: string): Promise<User>;

  abstract findBy(userFindBy?: IUserFindBy): Promise<User>;

  abstract create(item: CreateUserDTO): Promise<User>;

  abstract update(id: string, user: UpdateUserDTO): Promise<User>;

  abstract delete(id: string): Promise<void>;
}
