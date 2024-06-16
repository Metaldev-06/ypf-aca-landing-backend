import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.enableCors();
  app.setGlobalPrefix('api');
  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);
  logger.log(`Application is running on: ${PORT}`);
}
bootstrap();
