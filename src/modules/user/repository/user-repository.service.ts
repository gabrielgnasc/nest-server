import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/User.entity';
import { IUserRepository } from '../interfaces/user-repository.interface';

import { UserRepository } from './user.repository';

@Injectable()
export class UserRepositoryService implements IUserRepository {
  @InjectRepository(User)
  private readonly userRepository: UserRepository;

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findByEmail(email: string): Promise<User> {
    return null;
  }
  find(id: string): Promise<User> {
    return null;
  }
  create(item: User): Promise<User> {
    return null;
  }
  update(id: string, item: User): Promise<User> {
    return null;
  }
  delete(id: string): Promise<void> {
    return null;
  }
}
