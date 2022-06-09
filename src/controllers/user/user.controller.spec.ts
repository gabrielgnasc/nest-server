import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../services/user/user.service';
import { User } from '../../core/entities/User.entity';
import { CreateUserMapper } from '../../core/mappers/user/create-user.mapper';
import { NotAcceptableException } from '@nestjs/common';

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
      id,
      ...dto,
      login: 'any_login',
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
      jest.spyOn(userService, 'create').mockImplementationOnce(() => {
        throw new Error();
      });
      expect(userController.create(userCreate)).rejects.toThrowError();
    });

    it('should status 406 when email already exists', async () => {
      jest.spyOn(userService, 'create').mockImplementationOnce(() => {
        throw new NotAcceptableException('Email already exists!');
      });

      try {
        await userController.create(userCreate);
      } catch (error) {
        expect(error.status).toBe(406);
      }
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

  describe('update', () => {
    const userUpdate = {
      name: 'any_name',
      email: 'any_email@mail.com',
    };

    it('should throw an exception', async () => {
      const spy = jest
        .spyOn(userService, 'update')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      expect(
        userController.update('any_id', userUpdate),
      ).rejects.toThrowError();

      expect(spy).toHaveBeenCalled();
    });

    it('should return status 406 when email updated already in use', async () => {
      const spy = jest
        .spyOn(userService, 'update')
        .mockImplementationOnce(() => {
          throw new NotAcceptableException('Email already exists!');
        });

      try {
        await userController.update('any_id', userUpdate);
      } catch (error) {
        expect(error.status).toBe(406);
      }
      expect(spy).toHaveBeenCalled();
    });

    it('should return user if updated successfully', async () => {
      const result = await userController.update('any_id', userUpdate);

      expect(result).toEqual({
        id: 'any_id',
        name: 'any_name',
        login: 'any_login',
        email: 'any_email@mail.com',
      });

      expect(mockUserService.update).toHaveBeenCalledWith('any_id', userUpdate);
    });
  });
});
