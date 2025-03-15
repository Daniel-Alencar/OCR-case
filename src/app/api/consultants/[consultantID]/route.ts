import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { consultantID: string } }
) {
  try {
    const consultantID = parseInt(params.consultantID);

    // Validação do ID
    if (isNaN(consultantID)) {
      return NextResponse.json(
        { error: 'O ID do consultor deve ser um número válido.' },
        { status: 400 }
      );
    }

    // Consulta detalhada para buscar informações do consultor
    const consultant = await prisma.consultant.findUnique({
      where: { id: consultantID },
      include: {
        producers: {
          include: {
            producer: {
              include: {
                images: true, // ✅ Correto! "images" está dentro de "Producer"
              },
            },
          },
        },
      },
    });

    // Verifica se o consultor foi encontrado
    if (!consultant) {
      return NextResponse.json(
        { error: `Nenhum consultor encontrado com o ID ${consultantID}.` },
        { status: 404 }
      );
    }

    // Formatação dos dados, incluindo imagens como base64
    const formattedConsultant = {
      ...consultant,
      producers: consultant.producers.map((producer) => ({
        ...producer,
        images: producer.producer.images.map((image) => ({
          id: image.id,
          producerId: image.producerId,
          imageData: image.imageData?.toString() || null,
        })),
      })),
    };

    return NextResponse.json(formattedConsultant, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar o consultor:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar o consultor.' },
      { status: 500 }
    );
  }
}
