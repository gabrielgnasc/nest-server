import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserDTO } from '../../../common/dtos/user';
import { IAuthService } from '../../../common/interfaces/auth-interfaces/auth-service.interface';
import { IEmailService } from '../../../common/interfaces/mail-interfaces';
import { ISendMail } from '../../../common/interfaces/mail-interfaces/send-email.dto';

@Injectable()
export class MailService implements IEmailService {
  @Inject(MailerService)
  private readonly mailerService: MailerService;

  @Inject(IAuthService)
  private readonly authService: IAuthService;

  async sendRecoverPasswordEmail(user: UserDTO): Promise<void> {
    if (!user) throw new InternalServerErrorException('User is required');
    const token = await this.authService.getTokenByUser(user);
    const recoverURL = process.env.RECOVER_PASSWORD_URL || '';
    const url = `${recoverURL.startsWith('http://') ? '' : 'http://'}${recoverURL}/${token}`;
    await this.sendMail({
      to: user.email,
      subject: 'Password Recovery',
      template: 'recover-password',
      context: {
        name: user.name,
        url,
      },
    });
  }

  async sendMail(data: ISendMail) {
    if (!data) throw new InternalServerErrorException('Parameters are required');
    return await this.mailerService.sendMail(data);
  }
}

