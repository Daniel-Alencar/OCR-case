import React from 'react';

// Definindo a interface para as props
interface InfoFieldProps {
  label: string;
  value: string | number; // Pode ser string ou number, dependendo do valor passado
}

function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div className="flex flex-col mb-2">
      <label className="text-gray-700 mb-2 text-sm">{label}</label>
      <div
        className={`
          w-full p-4 border border-gray-300 rounded-lg 
          focus:outline-none focus:border-gray-400 placeholder-gray-400
          flex justify-center items-center
          bg-text-2
        `}
      >
        <p className="text-text-3 text-sm">{value}</p>
      </div>
    </div>
  );
}

export default InfoField;
