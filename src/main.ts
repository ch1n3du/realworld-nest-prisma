import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  patchNestJsSwagger();
  const swaggerOptions: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };
  const config = new DocumentBuilder()
    .setTitle('Realworld Backend')
    .setDescription('Realworld API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, swaggerOptions);
  SwaggerModule.setup('docs', app, document);

  await app.listen(8080);
}
bootstrap();
