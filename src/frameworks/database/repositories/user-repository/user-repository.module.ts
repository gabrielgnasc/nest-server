import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IUserRepository } from '../../../../core/abstracts/user-repository.abstract';
import { UserEntity } from '../../../../frameworks/database/schemas/User.entity';
import { UserRepositoryService } from './user-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepositoryService,
    },
  ],
  exports: [IUserRepository],
})
export class UserRepositoryModule {}
