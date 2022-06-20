import { Test, TestingModule } from '@nestjs/testing';
import { IAuthService } from '../../common/interfaces/auth-interfaces';
import { AuthController } from '../../modules/auth/controller/auth.controller';

describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: IAuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
});

