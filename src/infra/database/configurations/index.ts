import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';

const options: TypeOrmModuleOptions = {
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAMME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [path.resolve(__dirname, '..', 'entitys', '*')],
  migrations: [path.resolve(__dirname, '..', 'migrations', '*')],
  synchronize: true,
  logging: true,
} as TypeOrmModuleOptions;

module.exports = options;
