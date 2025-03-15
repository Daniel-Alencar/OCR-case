import { NextResponse } from 'next/server';
// Você pode usar uma biblioteca como openai 
// para facilitar a comunicação com a API
import { OpenAI } from 'openai';

// Configuração da API do OpenAI
const openai = new OpenAI({
  // Certifique-se de que a chave da API esteja configurada no .env
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  // Espera um array de mensagens
  const { messages } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      // Ou outro modelo LLM de sua escolha
      model: 'gpt-3.5-turbo', 
      messages: messages,
    });

    return NextResponse.json({ message: completion.choices[0].message });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar a mensagem' }, 
      { status: 500 }
    );
  }
}
