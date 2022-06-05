import { Module } from '@nestjs/common';
import { UserControllerController } from './user-controller/user-controller.controller';

@Module({
  imports: [],
  controllers: [UserControllerController],
})
export class ControllersModule {}
