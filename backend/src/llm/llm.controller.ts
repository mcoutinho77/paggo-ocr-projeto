import { Controller, Post, Body } from '@nestjs/common';

@Controller('llm')
export class LlmController {
  @Post('explain')
  explain(@Body() body: { question: string }) {
    return {
      answer: `Resposta para a pergunta: ${body.question}`,
    };
  }
}