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
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/**/*.migration.js'],
    migrationsRun: true,
    logging: false,
  } as TypeOrmModuleOptions;

  return configOptions;
}

export function getTestDatabaseSettings() {
  const configOptions: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    synchronize: true,
    logging: false,
    name: 'testConnection',
    entities: ['../../**/*.entity.{ts,js}'],
    migrations: ['../../**/*.migration.{ts,js}'],
    migrationsRun: true,
  } as TypeOrmModuleOptions;

  return configOptions;
}
