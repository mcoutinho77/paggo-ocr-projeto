import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadController } from './controllers/upload.controller'; // Importe o UploadController
import { DocumentsService } from './documents/documents.service'; // Importe o DocumentsService
import { PrismaService } from './prisma/prisma.service'; // Importe o PrismaService

@Module({
  imports: [],
  controllers: [AppController, UploadController], // Registre o UploadController aqui
  providers: [AppService, DocumentsService, PrismaService], // Registre os serviços necessários
})
export class AppModule {}