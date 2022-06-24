import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

	const options = new DocumentBuilder()
		.addBearerAuth()
		.setTitle('API Documentation')
		.setDescription('List of Endpoints available')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('docs', app, document);

	const port = configService.get('SERVER_PORT');
	await app.listen(port);
	Logger.log(`Appplication started on port: ${port}`);
}

bootstrap();
