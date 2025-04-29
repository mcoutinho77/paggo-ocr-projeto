import { Controller, Post, UploadedFile, UseInterceptors, UseGuards, Req, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    console.log(file);

    const userId = req.user.id; // Obtém o ID do usuário autenticado

    const extractedText = await this.documentsService.extractTextFromImage(file.path);

    const document = await this.documentsService.createDocument({
      file,
      userId,
      extractedText,
    });

    return {
      message: 'Arquivo enviado com sucesso!',
      extractedText: document.extractedText,
      documentId: document.id,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listDocuments(@Req() req: any) {
    const userId = req.user.id; // Obtém o ID do usuário autenticado
    return this.documentsService.listDocumentsByUser(userId);
  }
}