'use client'

import { useState } from 'react';

// Definindo os tipos de mensagem
import { Message } from '../../../types'; 
import SubHeader from '@/components/SubHeader';
import Header from '@/components/Header';

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (data.message) {
        setMessages([...updatedMessages, 
          { role: 'assistant', content: data.message.content }
        ]);
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
      <Header title='Descrição do documento'/>
      <SubHeader />
      <div className="flex flex-col bg-gray-100 p-4">
        <div className="flex flex-col flex-grow overflow-y-auto p-4 bg-white rounded-lg shadow-lg space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <div className="font-semibold">{msg.role === 'user' ? 'Você' : 'Assistente'}</div>
              <div>{msg.content}</div>
            </div>
          ))}

          {loading && (
            <div className="text-gray-500 p-2">Assistente digitando...</div>
          )}
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
            onClick={sendMessage}
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
