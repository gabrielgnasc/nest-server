import { Injectable } from '@nestjs/common';
import { User } from 'src/core/entities/User.entity';
import { IUserRepository } from '../../core/abstracts/user-repository.abstract';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  create(user: User): Promise<User> {
    return Promise.resolve(user);
  }
}
