import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LlmService {
  async getExplanation(prompt: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new InternalServerErrorException('A chave da API OpenAI não está configurada.');
    }

    interface OpenAIResponse {
      choices: { message: { content: string } }[];
    }

    const maxRetries = 5;
    let attempt = 0;

    console.log(`[LlmService] Iniciando requisição para o prompt: "${prompt}"`);

    while (attempt < maxRetries) {
      try {
        console.log(`[LlmService] Tentativa ${attempt + 1} de ${maxRetries}`);
        const startTime = Date.now();

        const response = await axios.post<OpenAIResponse>(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 50,
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
          },
        );

        const duration = Date.now() - startTime;
        console.log(`[LlmService] Resposta recebida em ${duration}ms`);

        if (!response.data.choices || response.data.choices.length === 0) {
          throw new InternalServerErrorException('Nenhuma resposta foi retornada pela API OpenAI.');
        }

        return response.data.choices[0].message.content.trim();
      } catch (error: any) {
        if (error.response?.status === 429) {
          console.warn('[LlmService] Limite de taxa atingido. Tentando novamente...');
          attempt++;
          await new Promise((resolve) => setTimeout(resolve, 10000)); // Aguarda 10 segundos antes de tentar novamente
        } else {
          console.error('[LlmService] Erro ao chamar a API OpenAI:', error.message);
          throw new InternalServerErrorException(
            `Erro na API OpenAI: ${error.response?.data?.error?.message || error.message}`,
          );
        }
      }
    }

    console.error('[LlmService] Limite de tentativas excedido.');
    return 'Desculpe, não foi possível processar sua solicitação no momento. Tente novamente mais tarde.';
  }
}