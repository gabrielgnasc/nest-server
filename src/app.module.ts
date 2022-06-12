import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FrameworksModule } from './frameworks/frameworks.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FrameworksModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
