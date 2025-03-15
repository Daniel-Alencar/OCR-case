'use client';
import React from 'react';

// Definindo a interface para as props
interface TextInputProps {
  label: string;
  placeholder: string;
  type?: string;
  value?: string | number;
}

function TextInput(
  { label, placeholder, type = 'text', value }: TextInputProps
) {
  return (
    <div className="flex flex-col mb-2">
      <label className="text-gray-700 mb-2 text-sm">{label}</label>
      <input
        type={type}
        name={label}
        placeholder={placeholder}
        value={value && value}
        className={`
          w-full p-4 border border-gray-300 rounded-lg 
          focus:outline-none focus:border-gray-400 placeholder-gray-400
          text-text-3 text-sm
        `}
      />
    </div>
  );
}

export default TextInput;
