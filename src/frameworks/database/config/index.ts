import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function getDatabaseSettings(configService: ConfigService) {
  if (configService) {
    return {
      type: configService.get('TYPEORM_CONNECTION'),
      host: configService.get('TYPEORM_HOST'),
      port: configService.get('TYPEORM_PORT'),
      username: configService.get('TYPEORM_USERNAMME'),
      password: configService.get('TYPEORM_PASSWORD'),
      database: configService.get('TYPEORM_DATABASE'),
      entities: ['../**/*.entity{.ts,.js}'],
      migrations: ['../**/*.migration{.ts,.js}'],
      synchronize: true,
      logging: true,
    } as TypeOrmModuleOptions;
  }

  const configOptions: TypeOrmModuleOptions = {
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAMME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/**/*.migration{.ts,.js}'],
    synchronize: true,
    logging: true,
  } as TypeOrmModuleOptions;

  return configOptions;
}
