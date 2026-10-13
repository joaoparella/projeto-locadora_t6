import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ForbiddenException, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      })
  )

  const config = new DocumentBuilder()
    .setTitle('API de Filmes e series - STREAMING API')
    .setDescription('A api simula uma api de cadastros para possivel plataforma de streaming')
    .setVersion('1.0')
    .addTag('usuarios')
    .addTag('filmes')
    .build();
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api',app,document);


  useContainer(app.select(AppModule),{fallbackOnErrors:true})

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
