import { Test, TestingModule } from '@nestjs/testing';
import { LlmService } from './llm.service';
import axios from 'axios';

jest.mock('axios');

describe('LlmService', () => {
  let service: LlmService;

  beforeEach(async () => {
    // Simular a chave da API OpenAI
    process.env.OPENAI_API_KEY = 'mocked_api_key';

    const module: TestingModule = await Test.createTestingModule({
      providers: [LlmService],
    }).compile();

    service = module.get<LlmService>(LlmService);
  });

  it('deve retornar uma explicação válida', async () => {
    const mockResponse = {
      data: {
        choices: [{ message: { content: 'Explicação gerada pela OpenAI.' } }],
      },
    };
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await service.getExplanation('Explique algo');
    expect(result).toBe('Explicação gerada pela OpenAI.');
  });

  it('deve lançar um erro se a API retornar erro', async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error('Erro na API'));

    await expect(service.getExplanation('Explique algo')).rejects.toThrow(
      'Erro na API OpenAI: Erro na API',
    );
  });
});

jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});