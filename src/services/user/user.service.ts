import { Injectable } from '@nestjs/common';
import { response } from 'express';
import { User } from 'src/core/entities/User.entity';
import { IUserRepository } from '../../core/abstracts/user-repository.abstract';

@Injectable()
export class UserService {
  // @Inject(CreateUserMapper)
  // private readonly createUserMapper: CreateUserMapper;

  // @Inject(UpdateUserMapper)
  // private readonly updateUserMapper: UpdateUserMapper;

  constructor(private readonly userRepository: IUserRepository) {}

  create(user: any): Promise<User> {
    return Promise.resolve(user);
  }

  update(id: string, user: any): Promise<User> {
    return Promise.resolve(user);
  }

  findById(id: string): Promise<User> {
    return Promise.resolve({} as any);
  }
}
