import React, { useEffect, useState } from "react";
import { getTokenPayload } from "@/lib/auth";

import { Document } from '@/app/(layout)/Documents/DocumentsManager/page';

interface TableProps {
  documents: Document[];
}

const TableDocumentsManager: React.FC<TableProps> = ({ documents }) => {

  const decoded = getTokenPayload();

  const [docs, setDocs] = useState<Document[]>([]);

  useEffect(() => {
    console.log(documents);
    setDocs(documents);
  }, [documents]);

  const handleDownload = async (consultantId: number, documentId: number) => {
    if(decoded && decoded.userType == "manager") {
      try {
        const response = await fetch(
          `/api/consultants/${consultantId}/document?documentId=${documentId}`
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

  const handleDelete = async (
    consultantId: number, documentId: number, documentListId: number
) => {

    if(decoded && decoded.userType == "manager") {
      try {
        const response = await fetch(
          `/api/consultants/${consultantId}/document?documentId=${documentId}`,
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

        const dataResponse = await response.json();

        if (dataResponse.success) {
          console.log("Documento apagado com sucesso!");
          alert("Documento apagado com sucesso!");

          documents.splice(documentListId, 1);
          setDocs(documents);
        }
      } catch (err) {
        alert("Erro ao deletar o documento.");
      }
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
            <th className="border border-gray-300 px-4 py-2 text-left">
              Consultor
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Email do consultor
            </th>
          </tr>
        </thead>
        <tbody>
          {docs && docs.map((document, documentListId) => (
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
                {document.consultant.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {document.consultant.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <a 
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={() => 
                    handleDownload(document.consultant.id, document.id)
                  }
                >
                  Baixar
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <a 
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={() => 
                    handleDelete(
                      document.consultant.id, document.id, documentListId
                    )
                  }
                >
                  Apagar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDocumentsManager;
