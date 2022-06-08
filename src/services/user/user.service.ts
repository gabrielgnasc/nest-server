import { Injectable } from '@nestjs/common';
import { User } from 'src/core/entities/User.entity';
import { IUserRepository } from '../../core/abstracts/user-repository.abstract';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  findAll() {
    return this.userRepository.findAll();
  }

  create(user: User) {
    return null;
  }
}
