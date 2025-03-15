import { useState } from "react";

interface DateInputProps {
  name: string;
  setValue: (value: Date) => void;
}

export default function DateInput({ name, setValue }: DateInputProps) {
  const [formattedDate, setFormattedDate] = useState<string>("");

  // Função para formatar a data no formato dd/mm/yyyy
  const formatDate = (date: string): string => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  // Função para lidar com alterações no input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Formato yyyy-mm-dd
    const rawValue = e.target.value;
    // Atualiza o estado com o formato dd/mm/yyyy
    setFormattedDate(formatDate(rawValue)); 

    // Converte para objeto Date
    const dateValue = new Date(rawValue); 
    // Chama a função setValue com o valor Date
    setValue(dateValue); 
  };

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor="date" className="mb-2 text-gray-700 font-semibold">
        {name}
      </label>
      <input
        type="date"
        id="date"
        name="date"
        className="
          w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none 
          focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={handleChange}
      />
      {formattedDate && (
        <p className="mt-2 text-gray-600">Selecionado: {formattedDate}</p>
      )}
    </div>
  );
}
