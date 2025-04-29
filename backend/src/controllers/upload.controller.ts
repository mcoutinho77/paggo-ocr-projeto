import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Req, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { DocumentsService } from '../documents/documents.service';
import { Response } from 'express';
import { AuthenticatedRequest } from '../auth/authenticated-request.interface';
import { existsSync, mkdirSync } from 'fs';

if (!existsSync('./uploads')) {
  mkdirSync('./uploads');
}
@Controller('upload') // Certifique-se de que o caminho está correto
export class UploadController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
@UseGuards(JwtAuthGuard)
@UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
        callback(null, uniqueName);
      },
    }),
  }),
)
async uploadFile(
  @UploadedFile() file: Express.Multer.File,
  @Req() req: AuthenticatedRequest,
  @Res() res: Response,
) {
  console.log('Arquivo recebido:', file);
  console.log('Usuário autenticado:', req.user);

  if (!file) {
    return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
  }

  try {
    const extractedText = await this.documentsService.extractTextFromImage(file.path);
    console.log('Texto extraído:', extractedText);

    const document = await this.documentsService.createDocument({
      file,
      userId: req.user.id,
      extractedText,
    });
    console.log('Documento criado:', document);

    return res.status(201).json({
      message: 'Arquivo enviado e processado com sucesso!',
      fileUrl: `/uploads/${file.filename}`,
      document,
    });
  } catch (error) {
    console.error('Erro ao processar o upload:', error);
    return res.status(500).json({
      message: 'Erro ao processar o arquivo.',
      error: error.message,
    });
  }
 }
}