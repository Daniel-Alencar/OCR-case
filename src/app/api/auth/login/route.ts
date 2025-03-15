import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Verificar campos obrigatórios
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await prisma.consultant.findUnique({ where: { email } });

    if(!user) {
      return NextResponse.json(
        { error: 'An error occurred during login' },
        { status: 500 }
      );
    }
    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Gerar JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    return NextResponse.json({ token, message: 'Login successful' });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
