import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const consultantId = searchParams.get("consultantId");

  try {
    const documents = await prisma.document.findMany({
      where: consultantId ? { consultantId: Number(consultantId) } : undefined,
      include: { consultant: { select: { id: true, name: true, email: true } } },
    });

    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar documentos" },
      { status: 500 }
    );
  }
}
