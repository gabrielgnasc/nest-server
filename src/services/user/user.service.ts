import {
  BadRequestException,
  Inject,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateUserDTO } from '../../common/dtos/user/create-user.dto';
import { UserDTO } from '../../common/dtos/user/user.dto';
import { IUserRepository } from '../../core/abstracts/user-repository.abstract';
import { UserMapper } from '../../core/mappers/user/user.mapper';

@Injectable()
export class UserService {
  @Inject(UserMapper)
  private readonly userMapper: UserMapper;

  constructor(private readonly userRepository: IUserRepository) {}

  async create(createUser: CreateUserDTO): Promise<UserDTO> {
    const user = await this.userRepository.findByEmail(createUser.email);
    if (user) throw new NotAcceptableException('email already exists!');
    const userEntity = await this.userRepository.create(createUser);
    return this.userMapper.fromEntity(userEntity);
  }

  update(id: string, user: any): Promise<UserDTO> {
    return Promise.resolve(user);
  }

  async findById(id: string): Promise<UserDTO> {
    if (!id) throw new BadRequestException('User id is required');
    const userEntity = await this.userRepository.find(id);
    return this.userMapper.fromEntity(userEntity);
  }

  updatePassword(id: string, user: any): Promise<void> {
    return Promise.resolve();
  }

  recoverPassword(email: string): Promise<string> {
    return Promise.resolve({} as any);
  }
}
