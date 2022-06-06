import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ControllersModule } from './controllers/controllers.module';
import { FrameworksModule } from './frameworks/frameworks.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FrameworksModule,
    ServicesModule,
    ControllersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
