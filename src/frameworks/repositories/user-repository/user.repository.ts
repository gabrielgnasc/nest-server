import { UserEntity } from 'src/frameworks/entities/User.entity';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<UserEntity> {}
