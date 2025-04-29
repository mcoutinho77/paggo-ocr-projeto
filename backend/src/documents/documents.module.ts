import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.cotroller'; // Certifique-se de que o caminho está correto
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DocumentsService],
  controllers: [DocumentsController], // Registre o DocumentsController
  exports: [DocumentsService],
})
export class DocumentsModule {}