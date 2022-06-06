import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getDatabaseSettings } from './database/config';
import { UserRepositoryModule } from './repositories/user-repository/user-repository.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getDatabaseSettings(configService),
    }),
    UserRepositoryModule,
  ],
  exports: [UserRepositoryModule],
})
export class FrameworksModule {}
