'use client';

import React, { useEffect, useState } from 'react';

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token de autenticação não encontrado. Faça login novamente.');
        }

        const res = await fetch('http://localhost:3001/documents', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorResponse = await res.json();
          throw new Error(errorResponse.message || 'Erro ao buscar documentos.');
        }

        const data = await res.json();
        setDocuments(data);
      } catch (err: any) {
        setError(err.message || 'Erro ao buscar documentos.');
        console.error('Erro ao buscar documentos:', err);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Seus Documentos</h1>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="list-disc pl-5">
        {documents.map((doc: any) => (
          <li key={doc.id} className="mb-2">
            <strong>{doc.fileName}</strong> - {new Date(doc.uploadDate).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentsPage;