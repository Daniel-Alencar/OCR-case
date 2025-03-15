import { getTokenPayload } from "@/lib/auth";
import Link from "next/link";
import React from "react";
import Tesseract from 'tesseract.js';

interface Document {
  id: number;
  name: string;
  url: string;
  text: string;
}

interface TableProps {
  documents: Document[];
}

const TableDocuments: React.FC<TableProps> = ({ documents }) => {

  const decoded = getTokenPayload();

  const handleDownload = async (documentId: number) => {
    if(decoded) {
      try {
        const response = await fetch(
          `/api/consultants/${decoded.id}/document?documentId=${documentId}`
        );

        if (!response.ok) {
          throw new Error("Erro ao baixar o documento");
        }

        const data = await response.json();

        if (data.success && data.document.url) {
          const downloadUrl = data.document.url;

          // Criar um link temporário para forçar o download
          const link = document.createElement("a");
          link.href = downloadUrl;
          // Nome do arquivo
          link.setAttribute("download", data.document.name); 
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          throw new Error("URL do documento não disponível.");
        }
      } catch (err) {
        alert("Erro ao baixar o documento.");
      }
    }
  };

  const handleDelete = async (documentId: number) => {
    if(decoded) {
      try {
        const response = await fetch(
          `/api/consultants/${decoded.id}/document?documentId=${documentId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao deletar o documento");
        }

        const data = await response.json();

        if (data.success) {
          console.log("Documento apagado com sucesso!");
          alert("Documento apagado com sucesso!");
        }
      } catch (err) {
        alert("Erro ao deletar o documento.");
      }
    }
  };

  const updateDocumentOCR = async (documentId: number, text: string) => {
    try {
      if (decoded) {
        // Fazendo o fetch da URL do documento a partir da API
        const response = await fetch(
          `/api/consultants/${decoded.id}/document?documentId=${documentId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),  // Enviando o texto como parte do corpo da requisição
          }
        );
  
        if (!response.ok) {
          throw new Error('Erro na atualização do texto da imagem');
        }
  
        const data = await response.json(); // Para capturar a resposta, se necessário
        console.log(data);
      }
    } catch (error) {
      console.error('Erro na atualização do texto da imagem:', error);
    }
  };
  

  const handleOCR = async (documentId: number) => {
    try {
      if(decoded) {
        // Fazendo o fetch da URL do documento a partir da API
        const response = await fetch(
          `/api/consultants/${decoded.id}/document?documentId=${documentId}`
        );

        if (!response.ok) {
          throw new Error("Erro ao baixar o documento");
        }

        const data = await response.json();

        if (data.success && data.document.url) {
          const imageURL = data.document.url;

          // Baixando a imagem e convertendo para um formato do Tesseract.js
          const imageResponse = await fetch(imageURL);
          const imageBlob = await imageResponse.blob();

          // Passando o blob para o Tesseract.js
          const result = await Tesseract.recognize(
            imageBlob,  // Aqui usamos o Blob da imagem
            'por',      // Idioma do OCR
            {
              logger: (m) => console.log(m), // Logs de progresso
            }
          );

          console.log("Texto extraído:", result.data.text);
          await updateDocumentOCR(documentId, result.data.text);
        }
      }
    } catch (error) {
      console.error("Erro no OCR:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">
              ID
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Nome
            </th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr 
              key={document.id} 
              className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
            >
              <td className="border border-gray-300 px-4 py-2">
                {document.id.toString().padStart(2, "0")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {document.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <a 
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={() => handleDownload(document.id)}
                >
                  Baixar
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <a 
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={() => handleDelete(document.id)}
                >
                  Apagar
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {
                  document.text != null
                  ? 
                    <Link href={`/Documents/${document.id}/Chat`}>
                      <p className="cursor-pointer text-blue-600 hover:underline">
                        Explicar documento
                      </p>
                    </Link>
                  : <a 
                      className="cursor-pointer text-blue-600 hover:underline"
                      onClick={() => handleOCR(document.id)}
                    >
                      Gerar OCR
                    </a>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDocuments;