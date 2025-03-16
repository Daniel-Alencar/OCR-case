import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface ConsultantRequestBody {
  name: string;
  email: string;
  password: string;
}

// Função para criar um usuário com senha em hash
const createConsultant = async (
  name: string,
  email: string,
  password: string,
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar o usuário com a senha em hash
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
    // Verifica se o email já existe
    const existingConsultant = await prisma.consultant.findUnique({
      where: { email },
    });
    if (existingConsultant) {
      return NextResponse.json({ error: 'Email já usado!' }, { status: 409 });
    }

    // Cria usuário
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
        error: 'Ocorreu um erro ao criar o usuário',
      },
      { status: 500 }
    );
  }
}
