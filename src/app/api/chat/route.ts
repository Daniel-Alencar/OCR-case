import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini_api_key = process.env.GEMINI_API_KEY;

if (!gemini_api_key) {
  throw new Error("A chave da API do Gemini não foi definida.");
}

// Inicializa a API do Gemini
const googleAI = new GoogleGenerativeAI(gemini_api_key);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Concatena todas as mensagens para formar um prompt adequado
    const prompt = messages.map((msg: { content: string }) => msg.content).join("\n");

    // Obtém o modelo Gemini correto
    const model = googleAI.getGenerativeModel({ model: "gemini-1.5-flash-002" });

    // Gera uma resposta baseada no prompt
    const result = await model.generateContent(prompt);

    // Extraindo a resposta do Gemini
    const responseText = result.response.text();

    return NextResponse.json({
      message: {
        role: "assistant",
        content: responseText,
      },
    });
  } catch (error: any) {
    console.error("Erro ao processar a mensagem:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao processar a mensagem" },
      { status: 500 }
    );
  }
}
