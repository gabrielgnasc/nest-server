import { UserEntity } from 'src/frameworks/database/schemas/User.entity';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<UserEntity> {}
