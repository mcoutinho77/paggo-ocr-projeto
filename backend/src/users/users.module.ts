import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Importa o PrismaModule
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}