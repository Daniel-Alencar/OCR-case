import React, { useEffect, useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  options: Option[];
  placeholder?: string;
  name: string;
  value?: string;

  // Função callback para comunicar a seleção
  onChange?: (value: string) => void;
}

const SelectInputAux: React.FC<SelectInputProps> = (
  { label, options, placeholder, name, onChange, value = '' }
) => {
  const [selectedOption, setSelectedOption] = useState<string>(value);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);

    // Comunica a alteração para o componente pai
    if (onChange) onChange(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-700 mb-2 text-sm">{label}</label>
      <select
        name={name}
        value={selectedOption}
        onChange={handleChange}
        className={`
          w-full p-4 border border-gray-300 rounded-lg
          bg-background text-left
          text-sm
          cursor-pointer
          ${selectedOption != '' ? 'text-text-3' : 'text-gray-400'}
        `}
      >
        <option value="" disabled>
          {placeholder || 'Selecione uma opção'}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInputAux;
