import { User } from '../entities/User.entity';

export abstract class IUserRepository {
  abstract findAll(): Promise<User[]>;

  abstract find(id: string): Promise<User>;

  abstract create(item: User): Promise<User>;

  abstract update(id: string, item: User): Promise<User>;

  abstract delete(id: string): Promise<void>;
}
