import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export function getMailSettings(configService: ConfigService) {
  const mailSettings = {
    transport: {
      host: configService.get('MAIL_HOST'),
      secure: configService.get('MAIL_SECURE').toString().toLocaleLowerCase() === 'TRUE',
      port: configService.get('MAIL_PORT'),
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('MAIL_PASSWORD'),
      },
    },
    defaults: {
      from: `"No Reply" <${configService.get('MAIL_FROM')}>`,
    },
    template: {
      dir: 'dist/modules/mail/templates',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  };
  return mailSettings;
}
