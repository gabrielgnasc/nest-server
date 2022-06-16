import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parseUserFindBy } from '../../../common/helpers';
import { User } from '../domain/User.entity';
import { IUserFindBy, IUserRepository } from '../interfaces';
import { UserRepository } from './user.repository';

@Injectable()
export class UserRepositoryService implements IUserRepository {
  @InjectRepository(User)
  private readonly userRepository: UserRepository;

  async findAll(userFindBy?: IUserFindBy): Promise<User[]> {
    const options = parseUserFindBy(userFindBy);
    return await this.userRepository.find({ where: options });
  }

  async find(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async create(item: User): Promise<User> {
    const user = await this.userRepository.create(item);
    return await this.userRepository.save(user);
  }

  async update(id: string, item: User): Promise<User> {
    const user = await this.find(id);
    await this.userRepository.merge(user, item);
    return await this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.softDelete({ id });
  }

  async findBy(userFindBy?: IUserFindBy): Promise<User> {
    const options = parseUserFindBy(userFindBy);
    return await this.userRepository.findOne({ where: options });
  }
}
