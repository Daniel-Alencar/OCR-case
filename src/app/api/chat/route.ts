import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    return NextResponse.json({ message: completion.choices[0].message });
  } catch (error: any) {
    console.error('Erro ao processar a mensagem:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar a mensagem' },
      { status: 500 }
    );
  }
}
