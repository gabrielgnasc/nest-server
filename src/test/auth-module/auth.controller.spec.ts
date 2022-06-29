import { Test, TestingModule } from '@nestjs/testing';
import { LoginDTO, TokenDTO } from '../../common/dtos/auth';
import { UserDTO } from '../../common/dtos/user';
import { ErrorMessageHelper } from '../../common/helpers';
import { IAuthService } from '../../common/interfaces/auth-interfaces';
import { IUserService } from '../../common/interfaces/user-interfaces';
import { AuthController } from '../../modules/auth/controller/auth.controller';
import { User } from '../../modules/user/domain/User.entity';
import { UserMapper } from '../../modules/user/mappers';

describe('AuthController', () => {
  let authController: AuthController;

  const userEntity = new User();
  userEntity.id = 'any_id';
  userEntity.login = 'any_login';
  userEntity.password = 'any_password';
  userEntity.hashPassword();

  const login = new LoginDTO();

  const mockAuthService = {
    login: jest.fn(async (user) => Promise.resolve(new TokenDTO('any_token'))),
  };
  const mockUserService = {
    findById: jest.fn(async (id) => {
      return Promise.resolve(userEntity);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: IAuthService,
          useValue: mockAuthService,
        },
        {
          provide: IUserService,
          useValue: mockUserService,
        },
        UserMapper,
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should throw a BadRequest error when no user data', async () => {
      try {
        await authController.login(undefined, login);
      } catch (error) {
        expect(error.status).toBe(400);
        expect(error.message).toEqual(ErrorMessageHelper.USER_REQUIRED);
      }
    });

    it('should return a token when successful', async () => {
      const token = await authController.login({ user: { id: 'any_id' } }, login);

      expect(token).toBeInstanceOf(TokenDTO);
      expect(mockAuthService.login).toBeDefined();
      expect(mockAuthService.login).toBeCalled();
    });
  });

  describe('getUserByToken', () => {
    it('should throw a BadRequest error when no token', async () => {
      try {
        await authController.getUserByToken(undefined);
      } catch (error) {
        expect(error.status).toBe(400);
        expect(error.message).toEqual(ErrorMessageHelper.INVALID_TOKEN);
      }
    });

    it('should return a UserDTO when successful', async () => {
      const token = await authController.getUserByToken({ user: { id: 'any_id', login: 'any_login' } });

      expect(token).toBeInstanceOf(UserDTO);
      expect(mockUserService.findById).toBeDefined();
      expect(mockUserService.findById).toBeCalled();
    });
  });
});

