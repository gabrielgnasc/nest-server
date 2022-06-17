import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, MailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
