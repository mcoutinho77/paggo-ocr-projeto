'use client';

import React, { useState } from 'react';

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Selecione um arquivo antes de enviar.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token'); // Recupera o token do localStorage
      const res = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Erro ao enviar o arquivo');
      }

      const data = await res.json();
      setMessage('Upload bem-sucedido!');
      console.log('Resposta do backend:', data);
    } catch (error) {
      console.error(error.message);
      setMessage('Erro ao enviar o arquivo.');
    }
  };

  return (
    <div>
      <h1>Upload de Arquivos</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Enviar Arquivo</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadForm;