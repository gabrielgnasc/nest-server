import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getJWTSettings } from '../../config/auth';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { IAuthService } from '../../common/interfaces/auth-interfaces';

const authService = {
  provide: IAuthService,
  useClass: AuthService,
};
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => getJWTSettings(configService),
    }),
  ],
  controllers: [AuthController],
  providers: [authService],
})
export class AuthModule {}

