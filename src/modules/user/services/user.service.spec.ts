import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from '../../../common/dtos/user/create-user.dto';
import { UpdateUserDTO } from '../../../common/dtos/user/update-user.dto';
import { UserDTO } from '../../../common/dtos/user/user.dto';
import { User } from '../domain/User.entity';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { UserMapper } from '../mappers/user.mapper';

import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: IUserRepository;

  const mockUserRepository = {
    find: jest.fn((id) => Promise.resolve(new User())),
    create: jest.fn((item) => Promise.resolve(new User())),
    update: jest.fn((id, user) => Promise.resolve(new User())),
    delete: jest.fn((id) => Promise.resolve()),
    findBy: jest.fn((dto) => Promise.resolve(new User())),
    findAll: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
        UserMapper,
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<IUserRepository>(IUserRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Find user by id', () => {
    it('should repository throw an exception', async () => {
      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error());

      expect(userService.findById('any_id')).rejects.toThrowError();
    });

    it('should NotFound(404) when user dont exists', async () => {
      jest.spyOn(userRepository, 'findBy').mockResolvedValueOnce(undefined);

      try {
        await userService.findById('any_id');
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });

    it('should user finded successfully', async () => {
      const user = await userService.findById('any_id');

      expect(userRepository).toBeDefined();
      expect(userRepository.find).toHaveBeenCalledWith('any_id');
      expect(userRepository.find).toHaveReturned();
      expect(user).toBeInstanceOf(UserDTO);
    });
  });

  describe('Create user', () => {
    const createUserDTO = new CreateUserDTO();
    createUserDTO.email = 'any_email@mail.com';
    createUserDTO.login = 'any_login';
    createUserDTO.name = 'any_name';
    createUserDTO.password = 'any_password';

    it('should repository throw an exception', async () => {
      jest.spyOn(userRepository, 'create').mockRejectedValueOnce(new Error());

      expect(userService.create(createUserDTO)).rejects.toThrowError();
    });

    it('should return NotAcceptable(406) when email already exists', async () => {
      jest
        .spyOn(userRepository, 'findBy')
        .mockImplementationOnce(
          (dto) =>
            ({ login: 'other_login', email: 'any_email@mail.com' } as any),
        );

      try {
        await userService.create(createUserDTO);
      } catch (error) {
        expect(error.status).toBe(406);
        expect(error.message).toEqual('this email is already used!');
      }
    });

    it('should return NotAcceptable(406) when login already exists', async () => {
      jest
        .spyOn(userRepository, 'findBy')
        .mockImplementationOnce(
          (dto) =>
            ({ login: 'any_login', email: 'other_email@mail.com' } as any),
        );

      try {
        await userService.create(createUserDTO);
      } catch (error) {
        expect(error.status).toBe(406);
        expect(error.message).toEqual('this login is already used!');
      }
    });

    it('should return UserDTO if user created successfully', async () => {
      jest
        .spyOn(userRepository, 'findBy')
        .mockImplementationOnce((dto) => undefined);
      const user = await userService.create(createUserDTO);
      expect(userRepository).toBeDefined();
      expect(userRepository.create).toHaveReturned();
      expect(user).toBeInstanceOf(UserDTO);
    });
  });

  describe('Update user', () => {
    const updateUserDTO = new UpdateUserDTO();
    updateUserDTO.email = 'any_email@mail.com';
    updateUserDTO.name = 'any_name';

    it('should repository throw an exception', async () => {
      jest.spyOn(userRepository, 'findAll').mockRejectedValueOnce(new Error());

      expect(
        userService.update('any_id', updateUserDTO),
      ).rejects.toThrowError();
    });

    it('should return NotAcceptable(406) when email already exists', async () => {
      jest
        .spyOn(userRepository, 'findAll')
        .mockImplementationOnce((dto) =>
          Promise.resolve([new User(), new User()]),
        );

      try {
        await userService.update('any_id', updateUserDTO);
      } catch (error) {
        expect(error.status).toBe(406);
      }
    });

    it('should return UserDTO if user updated successfully', async () => {
      jest
        .spyOn(userRepository, 'findAll')
        .mockImplementationOnce((dto) => Promise.resolve([new User()]));

      const user = await userService.update('any_id', updateUserDTO);
      expect(userRepository).toBeDefined();
      expect(userRepository.update).toHaveReturned();
      expect(user).toBeInstanceOf(UserDTO);
    });
  });
});
