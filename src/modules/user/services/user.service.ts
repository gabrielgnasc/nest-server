import {
  BadRequestException,
  Inject,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateUserDTO } from '../../../common/dtos/user/create-user.dto';
import { UpdateUserDTO } from '../../../common/dtos/user/update-user.dto';
import { UserDTO } from '../../../common/dtos/user/user.dto';
import { IUserRepository } from '../interfaces/user-repository.interface';

import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserService {
  @Inject(UserMapper)
  private readonly userMapper: UserMapper;

  constructor(private readonly userRepository: IUserRepository) {}

  async create(createUser: CreateUserDTO): Promise<UserDTO> {
    let user = await this.userRepository.findBy({
      email: createUser.email,
      login: createUser.login,
      method: 'OR',
    });
    if (user?.email === createUser.email)
      throw new NotAcceptableException('this email is already used!');
    if (user?.login === createUser.login)
      throw new NotAcceptableException('this login is already used!');
    user = await this.userRepository.create(createUser);
    return this.userMapper.fromEntity(user);
  }

  async update(id: string, updateUser: UpdateUserDTO): Promise<UserDTO> {
    const users = await this.userRepository.findAll({
      email: updateUser.email,
      id: id,
      method: 'OR',
    });
    if (users.length > 1)
      throw new NotAcceptableException('email already exists!');
    const user = await this.userRepository.update(id, updateUser);
    return this.userMapper.fromEntity(user);
  }

  async findById(id: string): Promise<UserDTO> {
    const user = await this.userRepository.find(id);
    if (!user) throw new BadRequestException('User dont exists');
    return this.userMapper.fromEntity(user);
  }

  updatePassword(id: string, user: any): Promise<void> {
    return Promise.resolve();
  }

  recoverPassword(email: string): Promise<string> {
    return Promise.resolve({} as any);
  }
}
