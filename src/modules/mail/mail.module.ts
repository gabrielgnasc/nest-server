import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMailSettings } from '../../config/mail';
import { IEmailService, IMailer } from '../../common/interfaces/mail-interfaces';
import { MailService } from './services/mail.service';

const mailService = {
  provide: IEmailService,
  useClass: MailService,
};

const mailerService = {
  provide: IMailer,
  useExisting: MailerService,
};

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => getMailSettings(configService),
    }),
  ],
  providers: [mailService, mailerService],
  exports: [mailService],
})
export class MailModule {}

