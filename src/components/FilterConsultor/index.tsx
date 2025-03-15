import Image from 'next/image';
import Search from '../../public/assets/Consultors/Search.svg';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Select, { MultiValue, ActionMeta } from 'react-select';
import { areaOptions } from '../FormRegister/indexC';

// Definir o tipo das props
interface Consultor {
  id: number;
  name: string;
}

interface FilterConsultorProps {
  consultants: Consultor[];
  changeFilterText: any;
  // Função callback para comunicar a seleção
  onChangeAreas: (value: string[]) => void;
}

export default function FilterConsultor({
  consultants,
  changeFilterText,
  onChangeAreas,
}: FilterConsultorProps) {
  const [filterText, setFilterText] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]); // Alterado para string[]

  const handleAreaChange = (
    selectedOptions: MultiValue<{ label: string; value: string }>,
    actionMeta: ActionMeta<{ label: string; value: string }>
  ) => {
    setSelectedAreas(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  useEffect(() => {
    changeFilterText(filterText);
  }, [filterText]);

  useEffect(() => {
    onChangeAreas(selectedAreas);
  }, [selectedAreas]);

  const formatGroupLabel = (data: {
    label: string;
    options: { label: string; value: string }[];
  }) => <div className="font-bold text-md text-primary">{data.label}</div>;

  return (
    <div
      className={`flex items-center justify-between bg-background mb-9 p-5 rounded-xl`}
    >
      <div className="">
        <p>Buscar consultor</p>
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
        <p className="font-extrabold text-lg">{consultants.length}</p>
        <p>consultores</p>
      </div>
      <div className="max-w-xs">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filtrar
        </label>
        <div className="relative">
          <Select
            isMulti
            options={areaOptions.map((category) => ({
              label: category.category,
              options: category.items,
            }))}
            onChange={handleAreaChange}
            placeholder="Selecione áreas de atuação"
            className="basic-multi-select w-full  rounded-lg 
              focus:outline-none focus:border-gray-400 placeholder-gray-400
              text-text-3 text-sm"
            classNamePrefix="select"
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            formatGroupLabel={formatGroupLabel}
          />
        </div>
      </div>
      <div>
        <Link href={'/ConsultantRegister'}>
          <button
            className={`
              bg-gradient-to-r from-button-linear-1 to-button-linear-2 text-white 
              font-thin text-xs py-3 px-12 rounded-lg
            `}
          >
            Adicionar Consultor
          </button>
        </Link>
      </div>
    </div>
  );
}
