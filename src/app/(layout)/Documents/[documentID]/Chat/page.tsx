'use client'

import { useState, useEffect } from 'react';
import { Message } from '../../../types'; 
import SubHeader from '@/components/SubHeader';
import Header from '@/components/Header';
import { useParams } from 'next/navigation';
import { getTokenPayload } from '@/lib/auth';

const ChatPage = () => {
  const params = useParams();
  const decoded = getTokenPayload();
  const documentID = params.documentID;

  const [messages, setMessages] = useState<Message[]>([]);
  const [initialMessage, setInitialMessage] = useState<Message | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const getOCRTranscrition = async (documentId: number) => {
    if (decoded) {
      try {
        const response = await fetch(
          `/api/consultants/${decoded.id}/document?documentId=${documentId}`,
          { method: 'GET' }
        );

        if (!response.ok) throw new Error("Erro ao buscar a transcrição");

        const data = await response.json();

        if (data.success) {
          const newInitialMessage: Message = {
            role: 'assistant',
            content: "(Descrição da imagem): " + data.document.text,
          };

          setInitialMessage(newInitialMessage);
          setMessages([newInitialMessage]);
        }
      } catch (err) {
        alert("Erro ao buscar a transcrição.");
      }
    }
  };

  useEffect(() => {
    getOCRTranscrition(parseInt(documentID)).then(() => {
      // Envia a mensagem inicial apenas se ela foi definida
      if (initialMessage) sendMessage('', true);

    });
  }, []);

  const sendMessage = async (text: string, isInitial = false) => {
    if (isInitial && initialMessage) {
      setMessages([initialMessage]); // Garante que a mensagem inicial seja enviada
    } else {
      const newMessage = { role: 'user', content: text };
      setMessages((prev) => [...prev, newMessage]);
    }

    if (!isInitial) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      const data = await response.json();

      if (data.message) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.message.content }]);
      } else {
        console.error('Erro:', data.error);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title="Descrição do documento" />
      <SubHeader />
      <div className="flex flex-col bg-gray-100 p-4">
        <div className="flex flex-col flex-grow overflow-y-auto p-4 bg-white rounded-lg shadow-lg space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <div className="font-semibold">{msg.role === 'user' ? 'Você' : 'Assistente'}</div>
              <div>{msg.content}</div>
            </div>
          ))}

          {loading && <div className="text-gray-500 p-2">Assistente digitando...</div>}
        </div>

        <div className="flex space-x-2 mt-4">
          <input
            type="text"
            className="flex-grow p-2 border rounded-lg"
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={() => sendMessage(input)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
            disabled={loading}
          >
            Enviar
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
