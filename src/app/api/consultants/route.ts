import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Tipagem para o corpo da requisição
interface ConsultantRequestBody {
  name: string;
  email: string;
  password: string;
}

// Função para criar um consultor com senha em hash
const createConsultant = async (
  name: string,
  email: string,
  password: string,
) => {
  // Gerar um hash da senha (10 é o número de rounds de salting)
  const hashedPassword = await bcrypt.hash(password, 10);

  const data = {
    name,
    email,
    password,
  };

  // Criar o consultor com a senha em hash
  const consultant = await prisma.consultant.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return consultant;
};

export async function POST(req: Request) {
  const {
    name,
    email,
    password,
  }: ConsultantRequestBody = await req.json();

  // Validação dos campos obrigatórios
  if (
    !name ||
    !email ||
    !password
  ) {
    return NextResponse.json(
      {
        error: 'Preencha os campos obrigatórios',
      },
      { status: 400 }
    );
  }

  try {
    // Verificar se o email já existe
    const existingConsultant = await prisma.consultant.findUnique({
      where: { email },
    });
    if (existingConsultant) {
      return NextResponse.json({ error: 'Email em uso' }, { status: 409 });
    }

    // Criar consultor
    const consultant = await createConsultant(
      name,
      email,
      password,
    );

    return NextResponse.json(
      {
        id: consultant.id,
        name: consultant.name,
        email: consultant.email,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: 'An error occurred while creating the consultant',
      },
      { status: 500 }
    );
  }
}
