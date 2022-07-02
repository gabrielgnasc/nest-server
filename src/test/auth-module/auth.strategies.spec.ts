import { Test, TestingModule } from '@nestjs/testing';
import { ErrorMessageHelper } from '../../common/helpers';
import { IAuthService, IGenericStrategy } from '../../common/interfaces/auth-interfaces';
import { JwtStrategy } from '../../modules/auth/strategies/jwt.strategy';
import { LocaStrategy } from '../../modules/auth/strategies/local.strategy';
import { User } from '../../modules/user/domain/User.entity';

describe('Strategies JWT and Local', () => {
  let authService: IAuthService;
  let localStrategy: LocaStrategy;
  let jwtStrategy: JwtStrategy;

  const mockAuthService = {
    validateUser: jest.fn((login, password) => Promise.resolve(new User())),
  };

  beforeEach(async () => {
    process.env.JWT_SECRET_KEY = 'any_secret';
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocaStrategy,
        JwtStrategy,
        {
          provide: IAuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authService = module.get<IAuthService>(IAuthService);
    localStrategy = module.get<LocaStrategy>(LocaStrategy);
    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(localStrategy).toBeDefined();
    expect(jwtStrategy).toBeDefined();
  });

  describe('Local Strategy', () => {
    it('should throw an exception when authService is not available', () => {
      mockAuthService.validateUser.mockRejectedValueOnce(new Error());
      expect(localStrategy.validate('any_login', 'any_password')).rejects.toThrowError();
    });

    it('should be UnauthorizedException when login or password is not valid', async () => {
      mockAuthService.validateUser.mockResolvedValueOnce(null);
      try {
        await localStrategy.validate('any_login', 'any_password');
      } catch (error) {
        expect(error.status).toBe(401);
        expect(error.message).toEqual(ErrorMessageHelper.PASSWORD_OR_EMAIL_INVALID);
      }
    });

    it('should return an user when successfully', async () => {
      const user = await localStrategy.validate('any_login', 'any_password');
      expect(user).toBeInstanceOf(User);
      expect(authService.validateUser).toBeCalled();
    });
  });

  describe('JWT Strategy', () => {
    it('should return id and login when successfully', async () => {
      const user = await jwtStrategy.validate({ sub: 'any_id', login: 'any_login' });
      expect(user).toEqual({
        id: expect.any(String),
        login: expect.any(String),
      });
      expect(authService.validateUser).toBeCalled();
    });
  });
});
