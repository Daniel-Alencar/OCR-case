import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Rota GET para contar o número total de consultores
export async function GET(req: Request) {
  // Parse da URL para extrair o parâmetro opcional 'search'
  const url = new URL(req.url);
  const search = url.searchParams.get('search');

  try {
    // Conta os consultores com ou sem filtro de pesquisa
    const consultantCount = await prisma.consultant.count({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
            ] as any,
          }
        : undefined,
    });

    // Retorna a contagem no formato JSON
    return NextResponse.json({ count: consultantCount }, { status: 200 });
  } catch (error) {
    console.error('Erro ao contar consultores:', error);

    // Retorna erro genérico em caso de falha
    return NextResponse.json(
      { error: 'An error occurred while counting consultants' },
      { status: 500 }
    );
  }
}
