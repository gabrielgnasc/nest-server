import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../services/user/user.service';
import { User } from '../../core/entities/User.entity';
import { CreateUserMapper } from '../../core/mappers/user/create-user.mapper';
import { UserDTO } from '../../core/dtos/user/user.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    create: jest.fn((dto) => ({
      id: Date.now().toString(),
      name: dto.name,
      email: dto.email,
      login: dto.login,
    })),
    update: jest.fn((id, dto) => ({
      id: id,
      ...dto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, CreateUserMapper],
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
    const userCreate = {
      name: 'any_name',
      login: 'any_login',
      email: 'any_email@mail.com',
      password: 'any_password',
    };

    it('should throw an exception', () => {
      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());
      expect(userController.create({} as any)).rejects.toThrowError();
    });

    it('should throw an exception', () => {
      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());
      expect(userController.create({} as any)).rejects.toThrowError();
    });

    it('should UserService.Create is called with User Entity', async () => {
      await userController.create(userCreate);
      const paramsCreate = mockUserService.create.mock.lastCall[0];
      expect(paramsCreate).toBeInstanceOf(User);
    });

    it('should return user if created successfully', async () => {
      const result = await userController.create(userCreate);

      expect(result).toEqual({
        id: expect.any(String),
        name: 'any_name',
        login: 'any_login',
        email: 'any_email@mail.com',
      });

      expect(mockUserService.create).toHaveBeenCalledWith(userCreate);
    });
  });
});
