'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    setError('');
    if (!file) {
      setError('Por favor, selecione um arquivo.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // Limite de 5MB
      setError('O arquivo é muito grande. O limite é de 5MB.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Recupera o token JWT do localStorage
      if (!token) {
        throw new Error('Token de autenticação não encontrado. Faça login novamente.');
      }

      const res = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token JWT no cabeçalho
        },
        body: formData,
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || 'Erro ao enviar o arquivo');
      }

      const data = await res.json();
      setText(data.extractedText);
      setDocumentId(data.document.id); // Ajuste para acessar o ID do documento
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar o arquivo. Tente novamente.');
      console.error('Erro ao enviar o arquivo:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Upload de Documento</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {text && (
        <div className="mt-6">
          <h2 className="text-lg font-bold">Texto Extraído:</h2>
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">{text}</pre>
        </div>
      )}

      {documentId && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">ID do Documento:</h2>
          <p className="bg-gray-100 p-2 rounded">{documentId}</p>
        </div>
      )}
    </div>
  );
}