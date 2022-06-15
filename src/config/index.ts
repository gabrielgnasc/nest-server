import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function getDatabaseSettings(configService: ConfigService) {
  const configOptions: TypeOrmModuleOptions = {
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

  return configOptions;
}

export function getTestDatabaseSettings() {
  const configOptions: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: '../unit-test/database/db-test.sqlite',
    entities: ['../**/*.entity{.ts,.js}'],
    migrations: ['../**/*.migration{.ts,.js}'],
    synchronize: true,
    logging: true,
  } as TypeOrmModuleOptions;

  return configOptions;
}
