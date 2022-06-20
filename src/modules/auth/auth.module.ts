import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getJWTSettings } from '../../config/auth';
import { UserModule } from '../user/user.module';
import { AuthServiceService } from './services/auth-service.service';
import { AuthController } from './controller/auth.controller';

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
  providers: [AuthServiceService],
})
export class AuthModule {}

