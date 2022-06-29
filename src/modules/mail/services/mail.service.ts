import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserDTO } from '../../../common/dtos/user';
import { ErrorMessageHelper } from '../../../common/helpers';
import { IEmailService } from '../../../common/interfaces/mail-interfaces';
import { ISendMail } from '../../../common/interfaces/mail-interfaces/send-email.dto';

@Injectable()
export class MailService implements IEmailService {
  @Inject(MailerService)
  private readonly mailerService: MailerService;

  async sendRecoverPasswordEmail(user: UserDTO, token: string): Promise<void> {
    if (!user) throw new InternalServerErrorException(ErrorMessageHelper.USER_REQUIRED);
    const recoverURL = process.env.RECOVER_PASSWORD_URL || '';
    const url = `${recoverURL.startsWith('http://') ? '' : 'http://'}${recoverURL}/${token}`;
    await this.sendMail({
      to: user.email,
      subject: ErrorMessageHelper.PASSWORD_RECOVERY,
      template: 'recover-password',
      context: {
        name: user.name,
        url,
      },
    });
  }

  async sendMail(data: ISendMail) {
    if (!data) throw new InternalServerErrorException(ErrorMessageHelper.PARAMETERS_REQUIRED);
    return await this.mailerService.sendMail(data);
  }
}

