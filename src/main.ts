import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Request 유효성 검사
  app.useGlobalPipes(
    new ValidationPipe({
      // DTO에 없는 property는 받지 않음
      whitelist: true,
      // DTO에 없는 property가 있을 때 Request 취소 및 경고 표시
      forbidNonWhitelisted: true,
      // 들어온 데이터의 타입을 알맞게 변환
      transform: true,
    }),
  );

  await app.listen(process.env.PORT);
}

bootstrap();
