import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAMME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [__dirname + '../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '../**/*.migration{.ts,.js}'],
  synchronize: true,
  logging: true,
} as TypeOrmModuleOptions;

module.exports = options;
