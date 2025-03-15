import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest, { params }: { params: { consultantID: string } }
) {
  
  try {
    // ID do Consultant obtido da URL
    const { consultantID } = params; 

    if (!consultantID) {
      return NextResponse.json(
        { error: "consultantId é obrigatório" }, { status: 400 }
      );
    }

    // Buscar todos os documentos relacionados ao consultantId
    const documents = await prisma.document.findMany({
      where: {
        consultantId: Number(consultantID),
      },
    });

    console.log(documents);

    return NextResponse.json({ success: true, documents }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar documentos:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
