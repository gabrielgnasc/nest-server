import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [ServicesModule],
  controllers: [UserController],
  providers: [],
})
export class ControllersModule {}
