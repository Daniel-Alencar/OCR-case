'use client';

import UploadDocumentManager from "@/components/UploadDocument/UploadDocumentManager";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface PopUpProps {
  title: string;
  ref: any;
  setShowPopUp: any;
}

interface Consultant {
  id: number;
  name: string;
}

export default function DocumentPopUpManager({
  title,
  ref,
  setShowPopUp
}: PopUpProps) {

  const [consultants, setConsultants] = useState<Consultant[]>([]);

  // Fetch Consultores
  const fetchConsultants = async () => {
    try {
      const response = await fetch(`/api/consultants/search?onlyAccepted=${true}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Erro ao buscar consultores.');
      }
      const data = await response.json();
      // Verifica se o dado retornado é um array
      if (Array.isArray(data)) {
        setConsultants(data);
      } else {
        throw new Error('Dados dos consultores inválidos.');
      }
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConsultants();
  }, []);

  const handleToClosePopUp = () => {
    setShowPopUp(false);
  }

  return (
    <div
      className={`z-10 h-full w-full bg-black bg-opacity-60 fixed right-0 top-0 flex justify-center items-center`}
    >
      <div
        ref={ref}
        className="z-20 border-0 border-transparent rounded-lg bg-white w-[500px] p-5 flex flex-col justify-between"
      >
        <div className='flex justify-between items-center'>
          <h4 className="text-lg font-bold text-center">{title}</h4>
          <button 
            onClick={handleToClosePopUp}
            className="p-2 rounded-full hover:bg-gray-200 transition duration-300"
          >
            <AiOutlineClose className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className='max-h-80 flex flex-col gap-3'>
          <UploadDocumentManager 
            consultants={consultants}
          />
        </div>
      </div>
    </div>
  );
}
