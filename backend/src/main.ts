import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração de CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://10.0.0.36:3000'], // Permitir origens do frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Habilitar validação global
  app.useGlobalPipes(new ValidationPipe());

  // Garantir que a pasta 'uploads' exista
  if (!existsSync('./uploads')) {
    mkdirSync('./uploads');
  }

  // Iniciar o servidor
  const PORT = 3001;
  await app.listen(PORT);
  console.log(`Servidor rodando em http://localhost:${PORT}`);
}
bootstrap();