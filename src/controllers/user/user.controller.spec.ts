import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from '../../core/dtos/user/create-user.dto';
import { UserController } from './user.controller';
import { UserService } from '../../services/user/user.service';
import { validate } from 'class-validator';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    create: jest.fn((dto) => ({
      id: Date.now(),
      name: dto.name,
      email: dto.email,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should throw an exception', () => {
      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());

      expect(userController.create({} as CreateUserDTO)).rejects.toThrowError();
    });

    it('should return user if created successfully', async () => {
      const userCreate = {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      };

      const result = await userController.create(userCreate);

      expect(result).toEqual({
        id: expect.any(Number),
        name: 'any_name',
        email: 'any_email@mail.com',
      });
    });
  });
});
