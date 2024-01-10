import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({ 
    origin: ['https://frontend-withcon-5gykd7gzwa-uc.a.run.app', 'http://localhost:8080'],
    credentials: true
  });
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3000;
  console.log("PORT IS ------ :", port)
  await app.listen(port);
}
bootstrap();