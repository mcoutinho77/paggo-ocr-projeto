import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lista todos os documentos de um usuário específico.
   * @param userId ID do usuário autenticado.
   * @returns Lista de documentos.
   */
  async listDocumentsByUser(userId: number) {
    return this.prisma.document.findMany({
      where: { userId },
      orderBy: { uploadDate: 'desc' }, // Ordena por data de upload (mais recente primeiro)
    });
  }

  /**
   * Simula a extração de texto de uma imagem.
   * @param imagePath Caminho da imagem.
   * @returns Texto extraído simuladamente.
   */
  async extractTextFromImage(imagePath: string): Promise<string> {
    return 'Texto extraído simuladamente';
  }

  /**
   * Cria um novo documento no banco de dados.
   * @param params Parâmetros contendo o arquivo, ID do usuário e texto extraído.
   * @returns Documento criado.
   */
  async createDocument(params: {
    file: Express.Multer.File;
    userId: number;
    extractedText: string;
  }) {
    const { file, userId, extractedText } = params;
  
    console.log('Criando documento com os dados:', { file, userId, extractedText });
  
    const document = await this.prisma.document.create({
      data: {
        fileName: file.originalname,
        extractedText,
        uploadDate: new Date(),
        userId,
      },
    });
  
    console.log('Documento salvo no banco de dados:', document);
  
    return document;
  }
}