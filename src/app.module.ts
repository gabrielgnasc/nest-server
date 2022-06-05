import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ControllersModule } from './controllers/controllers.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ControllersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
