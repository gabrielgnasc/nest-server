import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from '../../../../core/abstracts/user-repository.abstract';
import { UserDTO } from '../../../../common/dtos/user/user.dto';
import { UserEntity } from '../../../../frameworks/database/schemas/User.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserRepositoryService implements IUserRepository {
  @InjectRepository(UserEntity)
  private readonly userRepository: UserRepository;

  findAll(): Promise<UserDTO[]> {
    return this.userRepository.find();
  }
  find(id: string): Promise<UserDTO> {
    return null;
  }
  create(item: UserDTO): Promise<UserDTO> {
    return null;
  }
  update(id: string, item: UserDTO): Promise<UserDTO> {
    return null;
  }
  delete(id: string): Promise<void> {
    return null;
  }
}
