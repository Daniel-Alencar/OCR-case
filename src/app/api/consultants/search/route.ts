import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const search = url.searchParams.get('search');
  const onlyAccepted = url.searchParams.get('onlyAccepted');
  let onlyAcceptedValue;
  if (onlyAccepted !== null) {
    onlyAcceptedValue = onlyAccepted == 'true' ? true : false;
  }

  try {
    const consultants = await prisma.consultant.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search } },
              { email: { contains: search } },
            ],

            accepted: onlyAcceptedValue,
          }
        : {
            accepted: onlyAcceptedValue,
          },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        areaOfActivity: true,
        availability: true,
        description: true,
        producers: {
          select: {
            producer: {
              select: {
                id: true,
                name: true,
                phone: true,
                cnpj: true,
                street: true,
                neighborhood: true,
                city: true,
                state: true,
                number: true,
                zipCode: true,
                culture: true,
                plantationSize: true,
              },
            },
          },
        },
      },
    });

    const consultantsWithProductorsQuantity = consultants.map((consultant) => {
      const producers = consultant.producers.map((cp) => cp.producer);
      return {
        ...consultant,
        producers,
        productorsQuantity: producers.length,
      };
    });

    return NextResponse.json(consultantsWithProductorsQuantity, {
      status: 200,
    });
  } catch (error) {
    console.error('Erro ao listar consultores:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching consultants' },
      { status: 500 }
    );
  }
}
