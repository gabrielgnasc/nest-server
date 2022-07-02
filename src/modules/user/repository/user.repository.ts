import { Repository } from 'typeorm';
import { User } from '../domain/User.entity';

export class UserRepository extends Repository<User> {}
