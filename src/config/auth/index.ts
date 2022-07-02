import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export function getJWTSettings(configService: ConfigService) {
  const settings: JwtModuleOptions = {
    secret: configService.get('JWT_SECRET_KEY'),
    signOptions: {
      expiresIn: configService.get('JWT_TIME_EXPIRATION'),
    },
  };
  return settings;
}
