import Image from 'next/image';
import Search from '../../public/assets/Produtors/Search.svg';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Select, { MultiValue, ActionMeta } from 'react-select';
import { getTokenPayload } from '@/lib/auth';

// Definir o tipo das props
interface Produtor {
  id: number;
  name: string;
}

interface FilterProdutorProps {
  produtors: Produtor[];
  changeFilterText: any;
  // Função callback para comunicar a seleção
  onChangeAreas: (value: string[]) => void;
}

interface OptionType {
  label: string;
  value: string;
}

export default function FilterProdutor({
  produtors,
  changeFilterText,
  onChangeAreas,
}: FilterProdutorProps) {
  const decoded = getTokenPayload();

  const [filterText, setFilterText] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<OptionType[]>([]);

  const handleAreaChange = (selectedOptions: MultiValue<OptionType>) => {
    // Cria uma cópia mutável do array selecionado
    setSelectedAreas([...selectedOptions]);
  };

  useEffect(() => {
    changeFilterText(filterText);
  }, [filterText]);

  useEffect(() => {
    const areasList = selectedAreas.map((selectedArea) => selectedArea.value);
    onChangeAreas(areasList);
  }, [selectedAreas]);

  const formatGroupLabel = (data: { label: string }) => (
    <div className="font-bold text-md text-primary">{data.label}</div>
  );

  return (
    <div
      className={`flex items-center justify-between bg-background mb-9 p-5 rounded-xl`}
    >
      <div className="">
        <p>Buscar produtor</p>
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
        <p className="font-extrabold text-lg">{produtors.length}</p>
        <p>produtores</p>
      </div>
      <div>
        {decoded && decoded.userType == 'manager' && (
          <Link href={'/ProducerRegister'}>
            <button
              className={`
                bg-gradient-to-r from-button-linear-1 to-button-linear-2 text-white 
                font-thin text-xs py-3 px-12 rounded-lg
              `}
            >
              Adicionar Produtor
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
