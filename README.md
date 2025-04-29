# Paggo OCR Projeto

Este é um projeto full-stack para processamento de documentos de fatura usando OCR (Reconhecimento Óptico de Caracteres) e LLM (Modelo de Linguagem de Grande Escala). O sistema permite que os usuários façam o upload de imagens de faturas, extraia o texto dessas imagens usando OCR e ofereça explicações interativas sobre os dados extraídos.

## Funcionalidades

- **Upload de Faturas**: Usuários podem fazer upload de imagens de faturas.
- **Extração de Texto (OCR)**: O sistema utiliza OCR para extrair texto das imagens carregadas.
- **Explicações Interativas (LLM)**: Os usuários podem fazer perguntas sobre os dados extraídos e o modelo de linguagem fornece explicações detalhadas.
- **Visualização de Documentos**: Usuários podem visualizar todos os documentos enviados e as informações extraídas.
- **Download de Documentos**: Os usuários podem baixar as faturas com o texto extraído anexado.

## Tecnologias Usadas

- **Frontend**: React (Next.js), TypeScript, Tailwind CSS
- **Backend**: NestJS, Prisma ORM
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT
- **OCR**: Tesseract.js
- **LLM**: OpenAI API (ou outra solução de LLM)

## Como Rodar Localmente

1. **Clone o repositório**:
   
   ```bash
   git clone https://github.com/mcoutinho77/paggo-ocr-projeto.git
Instale as dependências do frontend:

Vá para o diretório frontend e instale as dependências:


cd frontend
npm install
Instale as dependências do backend:

Vá para o diretório backend e instale as dependências:


cd backend
npm install
Configure o banco de dados:

Para rodar o projeto localmente, você precisará de um banco de dados PostgreSQL configurado. Crie um banco de dados e ajuste as credenciais no arquivo .env de ambos os diretórios (frontend e backend).

Inicie o servidor do backend:

No diretório backend, rode:


npm run start:dev
Inicie o frontend:

No diretório frontend, rode:


npm run dev
Acesse o aplicativo:

Abra seu navegador e vá para http://localhost:3000.

Deploy no Vercel
O projeto está configurado para ser implantado no Vercel. Após realizar o deploy, o aplicativo estará disponível online. Acesse o link gerado pelo Vercel para testar a versão em produção.

Como Contribuir
Fork o repositório.

Crie uma branch para sua feature (git checkout -b minha-feature).

Faça commit das suas mudanças (git commit -am 'Adiciona nova feature').

Push para a branch (git push origin minha-feature).

Crie um pull request.

Licença
Este projeto está licenciado sob a MIT License - consulte o LICENSE para mais detalhes.

markdown

### Explicação dos Tópicos:
- **Nome e Descrição do Projeto**: Fala brevemente sobre o que é o projeto e sua finalidade.
- **Funcionalidades**: Resumo das principais funcionalidades do sistema.
- **Tecnologias Usadas**: Lista das tecnologias utilizadas no projeto.
- **Como Rodar Localmente**: Passo a passo para rodar o projeto localmente.
- **Deploy no Vercel**: Instruções sobre o deploy no Vercel, se já configurado.
- **Como Contribuir**: Instruções para outros contribuírem para o projeto.
- **Licença**: Caso você tenha uma licença, pode detalhá-la aqui.

Esse modelo é bem genérico, então, sinta-se à vontade para personalizar de acordo com o que mais achar relevante. Se precisar de mais algum ajuste ou uma explicação mais detalhada, só me avisar!
