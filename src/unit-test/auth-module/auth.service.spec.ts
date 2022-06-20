import { Test, TestingModule } from '@nestjs/testing';
import { IUserService } from '../../common/interfaces/user-interfaces';
import { AuthService } from '../../modules/auth/services/auth.service';
import { UserModule } from '../../modules/user/user.module';

describe('AuthService', () => {
  let authService: AuthService;

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
    updatePassword: jest.fn((id, dto) => {
      return null;
    }),
    recoverPassword: jest.fn((email) => ''),
    findById: jest.fn((id) => ({
      id: Date.now().toString(),
      name: 'any_name',
      login: 'any_login',
      email: 'any_email@mail.com',
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: IUserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});

