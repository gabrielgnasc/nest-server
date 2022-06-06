import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/core/abstracts/user-repository.abstract';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  findAll() {
    return this.userRepository.findAll();
  }
}
