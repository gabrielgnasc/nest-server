import { MailerService } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';
import { UserDTO } from '../../common/dtos/user';
import { IAuthService } from '../../modules/auth/interfaces/auth.service';
import { MailService } from '../../modules/mail/services/mail.service';

describe('ServicesService', () => {
  let mailService: MailService;

  const mockAuthService = {
    getTokenByUser: jest.fn((dto) => 'any_token'),
  };
  const mockMailerService = {
    sendMail: jest.fn((options) => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: IAuthService,
          useValue: mockAuthService,
        },
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
  });

  describe('sendRecoverPasswordEmail', () => {
    const user = new UserDTO();
    user.id = 'any_id';
    user.email = 'any_email@mail.com';
    user.name = 'any_name';
    user.login = 'any_login';

    it('should throw an exception when authService is not available', async () => {
      jest.spyOn(mockAuthService, 'getTokenByUser').mockImplementationOnce(() => {
        throw new Error();
      });
      expect(mailService.sendRecoverPasswordEmail(user)).rejects.toThrowError();
    });

    it('should throw an excepiton when dont have UserDTO parameter', async () => {
      expect(mailService.sendRecoverPasswordEmail(undefined)).rejects.toThrowError();

      try {
        await mailService.sendRecoverPasswordEmail(undefined);
      } catch (error) {
        expect(error.status).toBe(500);
        expect(error.message).toEqual('User is required');
      }
    });

    it('should send a email if everything goes successfully', async () => {
      await mailService.sendRecoverPasswordEmail(user);

      expect(mailService).toBeDefined();
      expect(mockAuthService.getTokenByUser).toBeCalledWith(user);
      expect(mockAuthService.getTokenByUser).toHaveReturnedWith('any_token');
      expect(mockMailerService.sendMail).toHaveBeenCalled();
    });
  });

  describe('sendEmail', () => {
    const mail = {
      to: 'any_email',
      subject: 'Password Recovery',
      template: 'recover-password',
      context: {
        name: 'any_name',
      },
    };

    it('should throw an exception when mailerService is not available', async () => {
      jest.spyOn(mockMailerService, 'sendMail').mockImplementationOnce(() => {
        throw new Error();
      });
      expect(mailService.sendMail(mail)).rejects.toThrowError();
    });

    it('should throw an excepiton when dont have parameter', async () => {
      try {
        await mailService.sendMail(undefined);
      } catch (error) {
        expect(error.status).toBe(500);
        expect(error.message).toEqual('Parameters are required');
      }
    });

    it('should send a email if everything goes successfully', async () => {
      await mailService.sendMail(mail);

      expect(mailService).toBeDefined();
      expect(mockMailerService.sendMail).toHaveBeenCalled();
    });
  });
});

