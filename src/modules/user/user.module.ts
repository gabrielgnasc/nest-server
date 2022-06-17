import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseSettings } from '../../config/database';
import { IEmailService } from '../mail/interfaces/email-service.interface';
import { MailModule } from '../mail/mail.module';
import { UserController } from './controller/user.controller';
import { User } from './domain/User.entity';
import { IUserRepository } from './interfaces/user-repository.interface';
import { IUserService } from './interfaces/user-service.interface';
import { CreateUserMapper } from './mappers/create-user.mapper';
import { UpdatePasswordMapper } from './mappers/update-password.mapper';
import { UpdateUserMapper } from './mappers/update-user.mapper';
import { UserMapper } from './mappers/user.mapper';
import { UserRepositoryService } from './repository/user-repository.service';
import { UserService } from './services/user.service';

const userService = {
  provide: IUserService,
  useClass: UserService,
};

const userRepository = {
  provide: IUserRepository,
  useClass: UserRepositoryService,
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => getDatabaseSettings(configService),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [userRepository, userService, UserMapper, UpdateUserMapper, CreateUserMapper, UpdatePasswordMapper],
  exports: [],
})
export class UserModule {}
