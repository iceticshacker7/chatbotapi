import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Module } from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for all routes
  await app.listen(3001);
}
bootstrap();