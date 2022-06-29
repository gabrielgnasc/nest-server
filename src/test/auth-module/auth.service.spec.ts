import { Test, TestingModule } from '@nestjs/testing';
import { TokenDTO } from '../../common/dtos/auth';
import { UserDTO } from '../../common/dtos/user';
import { ErrorMessageHelper } from '../../common/helpers';
import { IJwtService } from '../../common/interfaces/auth-interfaces';
import { IUserService } from '../../common/interfaces/user-interfaces';
import { AuthService } from '../../modules/auth/services/auth.service';
import { User } from '../../modules/user/domain/User.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: IJwtService;
  let userService: IUserService;

  const userEntity = new User();
  userEntity.id = 'any_id';
  userEntity.login = 'any_login';
  userEntity.password = 'any_password';
  userEntity.hashPassword();

  const mockUserService = {
    findById: jest.fn((id) => {
      return Promise.resolve(userEntity);
    }),
    findBy: jest.fn((options) => {
      return Promise.resolve(userEntity);
    }),
  };
  const mockJwtService = {
    sign: jest.fn((payload, options) => 'any_token'),
    decode: jest.fn((data, any) => ({ sub: 'any_id', login: 'any_login' })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: IUserService,
          useValue: mockUserService,
        },
        {
          provide: IJwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<IJwtService>(IJwtService);
    userService = module.get<IUserService>(IUserService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('login', () => {
    it('should throw an Internal Server Error when user is not passed', async () => {
      try {
        const token = await authService.login(undefined);
      } catch (error) {
        expect(error.status).toBe(500);
        expect(error.message).toEqual(ErrorMessageHelper.USER_REQUIRED);
      }
    });

    it('should throw an Internal Server Error when user dont contains id', async () => {
      try {
        const token = await authService.login({} as UserDTO);
      } catch (error) {
        expect(error.status).toBe(500);
        expect(error.message).toEqual(ErrorMessageHelper.USER_REQUIRED);
      }
    });

    it('should return a TokenDTO when successful', async () => {
      const user = { id: 'any_id', email: 'any_email' } as UserDTO;
      const token = await authService.login(user);
      expect(token).toBeInstanceOf(TokenDTO);
      expect(jwtService.sign).toHaveBeenCalled();
    });
  });

  describe('validateUser', () => {
    it('should return null when user is not found', async () => {
      mockUserService.findBy.mockImplementationOnce((args) => Promise.resolve(null));
      const response = await authService.validateUser('any_login', 'any_password');
      expect(response).toBeNull();
    });

    it('should return null when password dont match', async () => {
      const response = await authService.validateUser('any_login', 'other_password');
      expect(response).toBeNull();
    });

    it('should return a User Entity when successful', async () => {
      const response = await authService.validateUser('any_login', 'any_password');
      expect(response).toBeInstanceOf(User);
      expect(userService.findBy).toHaveBeenCalled();
      expect(response).toEqual(userEntity);
    });
  });
});

