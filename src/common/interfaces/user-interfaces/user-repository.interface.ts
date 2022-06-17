import { User } from '../../../modules/user/domain/User.entity';
import { IUserFindBy } from './user-findby.interface';

export abstract class IUserRepository {
  abstract findAll(userFindBy?: IUserFindBy): Promise<User[]>;

  abstract find(id: string): Promise<User>;

  abstract findBy(userFindBy?: IUserFindBy): Promise<User>;

  abstract create(item: User): Promise<User>;

  abstract update(id: string, user: User): Promise<User>;

  abstract delete(id: string): Promise<void>;
}
