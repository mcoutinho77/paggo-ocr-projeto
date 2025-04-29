import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Torna o módulo global para que não precise ser importado em outros módulos
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exporta o PrismaService para que outros módulos possam usá-lo
})
export class PrismaModule {}
