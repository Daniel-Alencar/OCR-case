import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";

const prisma = new PrismaClient();

// Configuração do multer para armazenar arquivos na pasta "uploads"
const upload = multer({
  storage: multer.memoryStorage(),
  // Limite de 5MB
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(null, false);
  }
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const consultantId = formData.get("consultantId") as string;

    if (!file || !consultantId) {
      return NextResponse.json({
        error: "Arquivo e consultantId são obrigatórios",
      }, { status: 400 });
    }

    // Verificar se o arquivo é uma imagem
    if (!file.type.startsWith("image")) {
      return NextResponse.json({
        error: "Arquivo deve ser uma imagem (JPEG, PNG ou GIF)",
      }, { status: 400 });
    }

    // Criar nome do arquivo único
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Verificar se o diretório existe, caso contrário, criar
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    
    // Salvar arquivo localmente
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);
    
    // Salvar no banco de dados
    const document = await prisma.document.create({
      data: {
        name: file.name,
        // Caminho do arquivo salvo
        url: `/uploads/${fileName}`,
        type: "image",
        consultant: { connect: { id: Number(consultantId) } }
      },
    });
    return NextResponse.json({ success: true, document }, { status: 201 });

  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json(
      { error: `Erro interno no servidor: ${error}` }, 
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest, 
  { params }: { params: { consultantID: string } }
) {
  try {
    const { consultantID } = params;
    const consultantId = consultantID;

    const url = new URL(req.url);
    const documentId = url.searchParams.get("documentId");

    if (!consultantId || !documentId) {
      return NextResponse.json(
        { error: "consultantId e documentId são obrigatórios" },
        { status: 400 }
      );
    }

    // Buscar o documento específico
    const document = await prisma.document.findFirst({
      where: {
        id: Number(documentId),
        consultantId: Number(consultantId),
      },
    });

    if (!document) {
      return NextResponse.json({
        error: "Documento não encontrado",
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true, document
    }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar documento:", error);
    return NextResponse.json(
      { error: `Erro interno no servidor: ${error}` }, 
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, 
  { params }: { params: { consultantID: string } }
) {
  try {
    const { consultantID } = params;
    const consultantId = Number(consultantID);

    const url = new URL(req.url);
    const documentId = Number(url.searchParams.get("documentId"));

    if (!consultantId || !documentId) {
      return NextResponse.json(
        { error: "consultantId e documentId são obrigatórios" },
        { status: 400 }
      );
    }

    // Buscar o documento específico
    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        consultantId: consultantId,
      },
    });

    if (!document) {
      return NextResponse.json(
        { error: "Documento não encontrado ou não pertence ao usuário" },
        { status: 404 }
      );
    }

    // Deletar o documento
    await prisma.document.delete({
      where: { id: documentId },
    });

    return NextResponse.json(
      { success: true, message: "Documento deletado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar documento:", error);
    return NextResponse.json(
      { error: `Erro interno no servidor: ${error}` }, 
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest,
  { params }: { params: { consultantID: string } }
) {
  try {
    const { consultantID } = params;

    const url = new URL(req.url);
    const documentId = Number(url.searchParams.get("documentId"));
    const { text } = await req.json();  

    // Verificando se os dados necessários estão presentes
    if (!consultantID || !documentId || !text) {
      return NextResponse.json(
        { error: 'Dados insuficientes para realizar a atualização' },
        { status: 400 }
      );
    }

    // Atualizando o documento no banco de dados
    const updatedDocument = await prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        text,
      },
    });

    // Retornando o documento atualizado
    return NextResponse.json({ success: true, document: updatedDocument });
  } catch (error) {
    console.error('Erro ao atualizar o documento:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar o documento' },
      { status: 500 }
    );
  }
}
