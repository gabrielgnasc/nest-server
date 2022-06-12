import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from '../../common/dtos/user/create-user.dto';
import { UserDTO } from '../../common/dtos/user/user.dto';
import { IUserRepository } from '../../core/abstracts/user-repository.abstract';
import { User } from '../../core/entities/User.entity';
import { UserMapper } from '../../core/mappers/user/user.mapper';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: IUserRepository;

  const mockUserRepository = {
    find: jest.fn((id) => Promise.resolve(new User())),
    create: jest.fn((item) => Promise.resolve(new User())),
    update: jest.fn((id) => Promise.resolve(new User())),
    delete: jest.fn((id) => Promise.resolve()),
    findByEmail: jest.fn((dto) => Promise.resolve()),
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

  describe('find user by id', () => {
    it('should repository throw an exception', async () => {
      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error());

      expect(userService.findById('any_id')).rejects.toThrowError();
    });

    it('should BadRequest(400) if id is not provided', async () => {
      try {
        await userService.findById(undefined);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });

    it('should NotFound(404) when id dont exists', async () => {
      jest
        .spyOn(userRepository, 'find')
        .mockRejectedValueOnce(new NotFoundException('user dont exists!'));

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
      expect(user).toBeInstanceOf(UserDTO);
      expect(await mockUserRepository.find('some_id')).toBeInstanceOf(User);
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
        .spyOn(userRepository, 'findByEmail')
        .mockImplementationOnce((dto) => dto as any);

      try {
        await userService.create(createUserDTO);
      } catch (error) {
        expect(error.status).toBe(406);
      }
    });

    it('should return UserDTO if user created successfully', async () => {
      const user = await userService.create(createUserDTO);
      expect(userRepository).toBeDefined();
      expect(userRepository.create).toHaveReturned();
      expect(user).toBeInstanceOf(UserDTO);
    });
  });
});
