import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

export let app: NestExpressApplication;
jest.setTimeout(100000);

async function initServer() {
  process.env.NODE_ENV = 'test';
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = module.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.init();
}

global.beforeAll(async () => {
  await initServer();
});

// global.afterAll(async () => {
//   await app.close();
// });
