import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
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
      expect(mockUserRepository.find).toHaveBeenCalledWith('any_id');
      expect(user).toBeInstanceOf(UserDTO);
      expect(await mockUserRepository.find('some_id')).toBeInstanceOf(User);
    });
  });
});
