import React from 'react';

// Definir o tipo das propriedades do componente
interface TextAreaInputProps {
  name: string;
  setValue: (value: string) => void;
}

function TextAreaInput({ name, setValue }: TextAreaInputProps) {
  return (
    <div>
      <label className="mb-2 text-gray-700 font-semibold">{name}</label>
      <textarea
        className="
          w-full p-3 border border-gray-300 rounded-md
          resize-none
        "
        rows={2}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  );
}

export default TextAreaInput;
