"use client";
import { useEffect, useState } from "react";

import addDocumentImage from '@/public/assets/Documents/AddDocument.png'
import Image from "next/image";
import { getTokenPayload } from "@/lib/auth";

interface Consultant {
  id: number;
  name: string;
}

interface UploadDocumentManagerProps {
  consultants: Consultant[]
}

export default function UploadDocumentManager(
  { consultants }: UploadDocumentManagerProps
) {

  const decoded = getTokenPayload();

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedConsultant, setSelectedConsultant] = useState<string>();

  const handleUpload = async () => {

    if(decoded && decoded.userType == "manager") {

      if(!selectedConsultant) {
        setMessage("Você precisa selecionar um consultor!");
        return;
      }
      if (!file) {
        setMessage("Selecione um arquivo antes de enviar.");
        return;
      }

      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("consultantId", `${selectedConsultant}`);

      try {
        const response = await fetch(
          `/api/consultants/${selectedConsultant}/document`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          setMessage("Upload bem-sucedido!");
        } else {
          setMessage(data.error || "Erro no upload");
        }
      } catch (error) {
        setMessage("Erro ao enviar arquivo.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setMessage(`Arquivo selecionado: ${event.target.files[0].name}`);
    }
  };

  return (
    <>
      <div className="
        p-6 border rounded-lg shadow-md 
        bg-white flex flex-col items-center
      ">

        {/* Campo para selecionar o produtor */}
        <select
          value={selectedConsultant}
          onChange={(e) => {
            setSelectedConsultant(e.target.value);
          }}
          className="mt-1 mb-5 p-2 border rounded-md w-full text-sm"
        >
          <option value="">Selecione um consultor</option>
          {consultants.length > 0 ? (
            consultants.map((consultant) => (
              <option 
                key={consultant.id} 
                value={consultant.id}
              >
                {consultant.name}
              </option>
            ))
          ) : (
            <option disabled>Sem produtores disponíveis</option>
          )}
        </select>

        {/* Input escondido */}
        <input 
          type="file" 
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt" 
          onChange={handleFileChange} 
          id="fileInput"
          className="hidden"
        />

        {/* Label atua como botão de upload */}
        <label htmlFor="fileInput" className="cursor-pointer">
          <Image 
            src={addDocumentImage}
            alt="Selecionar arquivo" 
            className=" transition-transform hover:scale-110"
          />
        </label>


        {/* Mensagem de status */}
        {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
      </div>
      <button
        onClick={handleUpload}
        disabled={loading}
        className="
          bg-gradient-to-r from-button-linear-1 to-button-linear-2 
          text-white font-thin text-xs py-3 px-12 rounded-lg
        "
      >
        {loading ? "Anexando..." : "Anexar"}
      </button>
    </>
  );
}
