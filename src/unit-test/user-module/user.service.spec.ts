import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from '../../common/dtos/user/create-user.dto';
import { UpdatePasswordDTO } from '../../common/dtos/user/update-password.dto';
import { UpdateUserDTO } from '../../common/dtos/user/update-user.dto';
import { IEmailService } from '../../common/interfaces/mail-interfaces';
import { User } from '../../modules/user/domain/User.entity';
import { IUserRepository } from '../../common/interfaces/user-interfaces/user-repository.interface';
import { CreateUserMapper } from '../../modules/user/mappers/create-user.mapper';
import { UpdatePasswordMapper } from '../../modules/user/mappers/update-password.mapper';
import { UpdateUserMapper } from '../../modules/user/mappers/update-user.mapper';
import { UserMapper } from '../../modules/user/mappers/user.mapper';
import { UserService } from '../../modules/user/services/user.service';
import { IAuthService } from '../../common/interfaces/auth-interfaces';
import { TokenDTO } from '../../common/dtos/auth';
import { IUserFindBy } from '../../common/interfaces/user-interfaces';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: IUserRepository;
  let emailService: IEmailService;
  let authService: IAuthService;

  const mockUserRepository = {
    find: jest.fn((id) => Promise.resolve(new User())),
    create: jest.fn((item) => Promise.resolve(new User())),
    update: jest.fn((id, user) => Promise.resolve(new User())),
    delete: jest.fn((id) => Promise.resolve()),
    findBy: jest.fn((dto) => {
      const user = new User();
      user.id = 'any_id';
      return Promise.resolve(user);
    }),
    findAll: jest.fn(),
  };

  const mockAuthService = {
    login: jest.fn(async (user) => Promise.resolve(new TokenDTO(''))),
  };

  const mockEmailService = {
    sendRecoverPasswordEmail: jest.fn((id: string) => Promise.resolve()),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: IEmailService,
          useValue: mockEmailService,
        },
        {
          provide: IAuthService,
          useValue: mockAuthService,
        },
        UserMapper,
        UpdateUserMapper,
        CreateUserMapper,
        UpdatePasswordMapper,
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<IUserRepository>(IUserRepository);
    emailService = module.get<IEmailService>(IEmailService);
    authService = module.get<IAuthService>(IAuthService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Find user by id', () => {
    it('should repository throw an exception', async () => {
      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error());

      expect(userService.findById('any_id')).rejects.toThrowError();
    });

    it('should NotFound(404) when user dont exists', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValueOnce(undefined);

      try {
        await userService.findById('any_id');
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });

    it('should user finded successfully', async () => {
      const user = await userService.findById('any_id');

      expect(userRepository).toBeDefined();
      expect(userRepository.find).toHaveBeenCalledWith('any_id');
      expect(userRepository.find).toHaveReturned();
      expect(user).toBeInstanceOf(User);
    });
  });

  describe('Create user', () => {
    const createUserDTO = new CreateUserDTO();
    createUserDTO.email = 'any_email@mail.com';
    createUserDTO.login = 'any_login';
    createUserDTO.name = 'any_name';
    createUserDTO.password = 'any_password';

    it('should repository throw an exception', async () => {
      jest.spyOn(userRepository, 'create').mockRejectedValueOnce(new Error());

      expect(userService.create(createUserDTO)).rejects.toThrowError();
    });

    it('should return NotAcceptable(406) when email already exists', async () => {
      jest
        .spyOn(userRepository, 'findBy')
        .mockImplementationOnce((dto) => ({ login: 'other_login', email: 'any_email@mail.com' } as any));

      try {
        await userService.create(createUserDTO);
      } catch (error) {
        expect(error.status).toBe(406);
        expect(error.message).toEqual('this email is already used!');
      }
    });

    it('should return NotAcceptable(406) when login already exists', async () => {
      jest
        .spyOn(userRepository, 'findBy')
        .mockImplementationOnce((dto) => ({ login: 'any_login', email: 'other_email@mail.com' } as any));

      try {
        await userService.create(createUserDTO);
      } catch (error) {
        expect(error.status).toBe(406);
        expect(error.message).toEqual('this login is already used!');
      }
    });

    it('should return UserDTO if user created successfully', async () => {
      jest.spyOn(userRepository, 'findBy').mockImplementationOnce((dto) => undefined);
      const user = await userService.create(createUserDTO);
      expect(userRepository).toBeDefined();
      expect(userRepository.create).toHaveReturned();
      expect(user).toBeInstanceOf(User);
    });
  });

  describe('Update user', () => {
    const updateUserDTO = new UpdateUserDTO();
    updateUserDTO.email = 'any_email@mail.com';
    updateUserDTO.name = 'any_name';

    it('should repository throw an exception', async () => {
      jest.spyOn(userRepository, 'findAll').mockRejectedValueOnce(new Error());

      expect(userService.update('any_id', updateUserDTO)).rejects.toThrowError();
    });

    it('should return NotAcceptable(406) when email already exists', async () => {
      jest.spyOn(userRepository, 'findAll').mockImplementationOnce((dto) => Promise.resolve([new User(), new User()]));

      try {
        await userService.update('any_id', updateUserDTO);
      } catch (error) {
        expect(error.status).toBe(406);
      }
    });

    it('should return UserDTO if user updated successfully', async () => {
      jest.spyOn(userRepository, 'findAll').mockImplementationOnce((dto) => Promise.resolve([new User()]));

      const user = await userService.update('any_id', updateUserDTO);
      expect(userRepository).toBeDefined();
      expect(userRepository.update).toHaveReturned();
      expect(user).toBeInstanceOf(User);
    });
  });

  describe('Update Password', () => {
    const updatePasswordDTO = new UpdatePasswordDTO();
    updatePasswordDTO.password = 'any_password';
    updatePasswordDTO.newPassword = 'new_passsword';

    it('should repository throw an exception', async () => {
      jest.spyOn(userRepository, 'find').mockImplementationOnce(() => {
        const user = new User();
        user.password = 'any_passsword';
        return Promise.resolve(user);
      });
      jest.spyOn(userRepository, 'update').mockRejectedValueOnce(new Error());

      expect(userService.updatePassword('any_id', updatePasswordDTO)).rejects.toThrowError();
    });

    it('should return NotFound(404) when user dont exists', async () => {
      jest.spyOn(userRepository, 'find').mockImplementationOnce(() => Promise.resolve(undefined));

      try {
        await userService.updatePassword('any_id', updatePasswordDTO);
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.message).toEqual('User dont exists');
      }
    });

    it('should return NotAcceptable(406) when password is not valid', async () => {
      jest.spyOn(userRepository, 'find').mockImplementationOnce((id) => {
        const user = new User();
        user.password = 'new_passsword';
        user.hashPassword();
        return Promise.resolve(user);
      });

      try {
        await userService.updatePassword('any_id', updatePasswordDTO);
      } catch (error) {
        expect(error.status).toBe(406);
        expect(error.message).toEqual('New password is not valid');
      }
    });

    it('should password is updated successsfully', async () => {
      jest.spyOn(userRepository, 'find').mockImplementationOnce(() => {
        const user = new User();
        user.password = 'old_passsword';
        return Promise.resolve(user);
      });

      await userService.updatePassword('any_id', updatePasswordDTO);
      expect(userRepository).toBeDefined();
      expect(userRepository.find).toHaveReturned();
      expect(userRepository.update).toHaveReturned();
    });
  });

  describe('Recover Password', () => {
    it('should repository throw an exception', async () => {
      jest.spyOn(userRepository, 'findBy').mockRejectedValueOnce(new Error());

      expect(userService.recoverPassword('any_amail@mail.com')).rejects.toThrowError();
    });

    it('should return NotFound(404) when email is not registered', async () => {
      jest.spyOn(userRepository, 'findBy').mockImplementationOnce(() => Promise.resolve(undefined));

      try {
        await userService.recoverPassword('any_amail@mail.com');
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.message).toEqual('Unregistered Email');
      }
    });

    it('Email service throw an exception', async () => {
      jest.spyOn(emailService, 'sendRecoverPasswordEmail').mockRejectedValueOnce(new Error());

      expect(userService.recoverPassword('any_amail@mail.com')).rejects.toThrowError();
    });

    it('should return message if service send email successsfully', async () => {
      const message = await userService.recoverPassword('any_id');
      expect(userRepository).toBeDefined();
      expect(userRepository.findBy).toHaveReturned();
      expect(emailService.sendRecoverPasswordEmail).toBeCalled();
      expect(authService.login).toBeCalled();
      expect(message).toEqual('Email successfully sent!');
    });
  });

  describe('Find By', () => {
    const userFindBy: IUserFindBy = {
      email: 'any_email',
      id: 'any_id',
    };

    it('should repository throw an exception', async () => {
      jest.spyOn(userRepository, 'findBy').mockRejectedValueOnce(new Error());

      expect(userService.findBy(userFindBy)).rejects.toThrowError();
    });

    it('should return UserDTO if user updated successfully', async () => {
      jest.spyOn(userRepository, 'findBy').mockImplementationOnce((dto) => Promise.resolve(new User()));

      const user = await userService.findBy(userFindBy);
      expect(userRepository).toBeDefined();
      expect(userRepository.findBy).toHaveReturned();
      expect(user).toBeInstanceOf(User);
    });
  });
});
