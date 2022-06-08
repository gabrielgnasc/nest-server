import { Module } from '@nestjs/common';
import { FrameworksModule } from '../frameworks/frameworks.module';
import { UserService } from './user/user.service';

@Module({
  imports: [FrameworksModule],
  providers: [UserService],
  exports: [UserService],
})
export class ServicesModule {}
