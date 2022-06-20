import { Test, TestingModule } from '@nestjs/testing';
import { IAuthService } from '../../../common/interfaces/auth-interfaces';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockAuthService = {
    provide: IAuthService,
    useClass: AuthService,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: IAuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

