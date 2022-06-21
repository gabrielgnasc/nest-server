import { Inject, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO, UpdatePasswordDTO } from '../../../common/dtos/user';
import { IEmailService } from '../../../common/interfaces/mail-interfaces';
import { IUserFindBy, IUserService } from '../../../common/interfaces/user-interfaces';
import { IUserRepository } from '../../../common/interfaces/user-interfaces/user-repository.interface';
import { User } from '../domain/User.entity';
import { CreateUserMapper, UpdateUserMapper, UpdatePasswordMapper, UserMapper } from '../mappers';

@Injectable()
export class UserService implements IUserService {
  @Inject(UserMapper)
  private readonly userMapper: UserMapper;

  @Inject(CreateUserMapper)
  private readonly createUserMapper: CreateUserMapper;

  @Inject(UpdateUserMapper)
  private readonly updateUserMapper: UpdateUserMapper;

  @Inject(UpdatePasswordMapper)
  private readonly updatePasswordMapper: UpdatePasswordMapper;

  @Inject(IUserRepository)
  private readonly userRepository: IUserRepository;

  @Inject(IEmailService)
  private readonly emailService: IEmailService;

  constructor() {}

  async create(data: CreateUserDTO): Promise<User> {
    let user = await this.userRepository.findBy({ email: data.email, login: data.login, method: 'OR' });

    if (user?.email === data.email) throw new NotAcceptableException('this email is already used!');
    if (user?.login === data.login) throw new NotAcceptableException('this login is already used!');

    return await this.userRepository.create(this.createUserMapper.toEntity(data));
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    const users = await this.userRepository.findAll({ email: data.email, id: id, method: 'OR' });

    if (users.length > 1) throw new NotAcceptableException('email already exists!');

    return await this.userRepository.update(id, this.updateUserMapper.toEntity(data));
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.find(id);

    if (!user) throw new NotFoundException('User dont exists');

    return user;
  }

  async updatePassword(id: string, data: UpdatePasswordDTO): Promise<void> {
    let user = await this.userRepository.find(id);

    if (!user) throw new NotFoundException('User dont exists');
    if (!user.newPasswordIsValid(data.newPassword)) throw new NotAcceptableException('New password is not valid');

    user = await this.userRepository.update(id, this.updatePasswordMapper.toEntity(data));
  }

  async recoverPassword(email: string): Promise<string> {
    let user = await this.userRepository.findBy({ email });
    if (!user) throw new NotFoundException('Unregistered Email');

    await this.emailService.sendRecoverPasswordEmail(this.userMapper.fromEntity(user));
    return 'Email successfully sent!';
  }

  async findBy(data?: IUserFindBy): Promise<User> {
    return await this.userRepository.findBy(data);
  }
}
