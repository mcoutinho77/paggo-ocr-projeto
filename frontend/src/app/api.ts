const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchExplanation(text: string): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/llm/explain`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 88e058536abacef251cca5f9df264381ee6638db84785a8e842e5c2e5db48743',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao chamar a API');
    }

    const data = await response.json();
    return data.explanation;
  } catch (error: any) {
    console.error('Erro na requisição:', error.message);
    throw new Error('Não foi possível obter a explicação. Tente novamente mais tarde.');
  }
}