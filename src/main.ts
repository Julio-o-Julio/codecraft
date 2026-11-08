import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Definindo o prefixo global
  app.setGlobalPrefix('api/v1');

  // Definindo a pipe global
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // Documentação só fora de produção: em produção ela entrega o mapa da API.
  if (process.env.NODE_ENV !== 'production') {
    const configDocs = new DocumentBuilder()
      .setTitle('Typed API')
      .setDescription('Documentação da API')
      .setVersion('1.0.0')
      .build();
    const document = SwaggerModule.createDocument(app, configDocs);
    SwaggerModule.setup('api/v1/docs', app, document);
  }

  await app.listen(process.env.API_V1_PORT ?? 3000, '0.0.0.0');
}
bootstrap();
