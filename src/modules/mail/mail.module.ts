import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMailSettings } from '../../config/mail';
import { IAuthService } from '../../common/interfaces/auth-interfaces/auth-service.interface';
import { IEmailService } from '../../common/interfaces/mail-interfaces';
import { MailService } from './services/mail.service';

const mailService = {
  provide: IEmailService,
  useClass: MailService,
};

const authService = {
  provide: IAuthService,
  useValue: {
    getTokenByUser: (dto) => 'token',
  },
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
  providers: [mailService, authService],
  exports: [mailService],
})
export class MailModule {}

