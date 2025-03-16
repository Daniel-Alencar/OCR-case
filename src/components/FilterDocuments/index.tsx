import Image from 'next/image';
import Search from '../../public/assets/Search.svg';
import { useEffect, useState } from 'react';
import DocumentPopUp from '@/components/DocumentPopUp';

interface Document {
  id: number;
  name: string;
}

interface FilterDocumentsProps {
  documents: Document[];
  changeFilterText: any;
}

export default function FilterDocuments({
  documents,
  changeFilterText,
}: FilterDocumentsProps) {
  const [filterText, setFilterText] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    changeFilterText(filterText);
  }, [filterText]);

  return (
    <div
      className={`flex items-center justify-between bg-background mb-9 p-5 rounded-xl`}
    >
      <div className="">
        <p>Buscar imagens</p>
        <div className="flex items-center border rounded-lg overflow-hidden max-w-md">
          <input
            type="text"
            placeholder=""
            className="w-full px-4 py-2 text-gray-700 focus:outline-none"
            value={filterText}
            onChange={(event) => setFilterText(event.target.value)}
          />
          <button className="p-2 px-4 text-gray-500 hover:text-gray-700">
            <Image alt="search" src={Search} />
          </button>
        </div>
      </div>
      <div>
        <p className="font-extrabold text-lg">{documents.length}</p>
        <p>imagens</p>
      </div>
      <div>
        <button
          onClick={() => setShowPopUp(true)}
          className={`
            bg-gradient-to-r from-button-linear-1 to-button-linear-2 text-white 
            font-thin text-xs py-3 px-12 rounded-lg
          `}
        >
          Adicionar imagem
        </button>
      </div>

      {showPopUp && (
        <DocumentPopUp
          ref={null}
          setShowPopUp={setShowPopUp}
          title="Adicionar imagem"
        />
      )}
    </div>
  );
}
