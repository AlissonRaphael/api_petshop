import { NestFactory } from '@nestjs/core';
import * as compression from 'compression'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module';
import { CustomLogger } from './shared/services/customLogger.service'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // { logger: new CustomLogger() }

  app.use(compression())

  SwaggerModule.setup(
    'docs',
    app,

    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
      .setTitle('Petshop API')
      .setDescription('API for petshop service')
      .setVersion('1.0.0')
      .addTag('petshop')
      .build()
    )
  )

  await app.listen(3000);
}
bootstrap();
