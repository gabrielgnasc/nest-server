import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/core/entities/User.entity';
import { UserDTO } from '../../common/dtos/user/user.dto';
import { IUserRepository } from '../../core/abstracts/user-repository.abstract';
import { UserMapper } from '../../core/mappers/user/user.mapper';

@Injectable()
export class UserService {
  // @Inject(CreateUserMapper)
  // private readonly createUserMapper: CreateUserMapper;

  // @Inject(UpdateUserMapper)
  // private readonly updateUserMapper: UpdateUserMapper;

  @Inject(UserMapper)
  private readonly userMapper: UserMapper;

  constructor(private readonly userRepository: IUserRepository) {}

  create(user: any): Promise<UserDTO> {
    return Promise.resolve(user);
  }

  update(id: string, user: any): Promise<UserDTO> {
    return Promise.resolve(user);
  }

  async findById(id: string): Promise<UserDTO> {
    if (!id) {
      throw new BadRequestException('User id is required');
    }
    const userEntity = await this.userRepository.find(id);
    return this.userMapper.toDTO(userEntity);
  }

  updatePassword(id: string, user: any): Promise<void> {
    return Promise.resolve();
  }

  recoverPassword(email: string): Promise<string> {
    return Promise.resolve({} as any);
  }
}
