'use client';
import { useState } from 'react';
import React from 'react';
import SelectInputAux from './SelectInputAux';

// Definindo a interface para as opções
interface Option {
  value: string;
  label: string;
}

// Definindo a interface para as propriedades do SelectInput
interface SelectInputProps {
  label: string;
  placeholder: string;
  options: Option[];
  value?: string;
}

const genderOptions = [
  { value: 'Masculino', label: 'Masculino' },
  { value: 'Feminino', label: 'Feminino' },
  { value: 'Prefiro não dizer', label: 'Prefiro não dizer' },
];

function SelectInput(
  { label, placeholder, options, value = '' }: SelectInputProps
) {

  const handleSelectionChange = (value: string) => {
    console.log('Opção selecionada:', value);
  };

  return (
    <>
      <SelectInputAux
        label={label}
        name={label}
        options={options}
        placeholder={placeholder}
        value={value}
        onChange={handleSelectionChange}
      />
    </>
  );
}

export default SelectInput;
