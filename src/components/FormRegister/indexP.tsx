'use client';

import React from 'react';
import TextInput from './TextInput';
import ImageInput from './ImageInput';
import InfoField from './InfoField';
import SelectInput from './SelectInput';

const stateOptions = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

function FormRegister() {
  const submitForms = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data = {
      name: formData.get('Nome') as string,
      email: formData.get('Email') as string,
      phone: formData.get('Telefone/WhatsApp') as string,
      description: formData.get('O que oferece') as string,
      password: formData.get('Senha') as string,
      passwordAgain: formData.get('Confirmar senha') as string,
      street: formData.get('Rua') as string,
      razaoSocial: formData.get('Razão Social') as string,
      neighborhood: formData.get('Bairro') as string,
      city: formData.get('Cidade') as string,
      state: formData.get('Estado/UF') as string,
      number: formData.get('Número') as string,
      zipCode: formData.get('CEP') as string,
      porcentagem: formData.get('Porcentagem') as string,
      observacoes: formData.get('Observações') as string,
    };

    if (data.password !== data.passwordAgain) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Erro ao cadastrar Parceiro: ${errorData.error}`);
        return;
      }

      const result = await response.json();
      alert(`Parceiro cadastrado com sucesso! ID: ${result.id}`);
    } catch (error) {
      alert('Erro inesperado. Tente novamente mais tarde.');
    }
  };

  return (
    <form
      className="container bg-background rounded-custom-1 p-7 w-full flex flex-col gap-4"
      onSubmit={(event) => submitForms(event)}
    >
      <h4 className="font-bold text-primary mb-5">Novo Parceiro</h4>
      <div className="flex px-8">
        <div className="px-8 flex-1 grid grid-cols-2 gap-4">
          <TextInput
            label={'Nome'}
            placeholder={'Digite seu nome'}
            type={'text'}
          />
          <TextInput
            label={'Razão Social'}
            placeholder={'Digite sua razão social'}
            type={'text'}
          />

          <TextInput
            label={'CNPJ'}
            placeholder={'Digite seu CNPJ'}
            type={'number'}
          />
          <TextInput
            label={'Email'}
            type={'email'}
            placeholder={'Digite seu e-mail'}
          />
          <TextInput
            label={'Telefone/WhatsApp'}
            type={'number'}
            placeholder={'Digite seu telefone'}
          />
          <TextInput
            label={'O que oferece'}
            type={'text'}
            placeholder={'Descreva seus serviços/produto'}
          />
          <TextInput
            label={'Senha'}
            type={'password'}
            placeholder={'Digite sua senha'}
          />
          <TextInput
            label={'Confirmar senha'}
            type={'password'}
            placeholder={'Confirme a senha novamente'}
          />
          <TextInput
            label={'Rua'}
            placeholder={'Digite sua rua'}
            type={'text'}
          />
          <TextInput
            label={'Bairro'}
            placeholder={'Digite seu bairro'}
            type={'text'}
          />
          <TextInput
            label={'Cidade'}
            placeholder={'Digite sua cidade'}
            type={'text'}
          />
          <TextInput
            label={'CEP'}
            placeholder={'Insira seu CEP'}
            type={'text'}
          />
          <SelectInput
            label={'Estado/UF'}
            placeholder={'Selecione o Estado/UF'}
            options={stateOptions}
          />
          <TextInput
            label={'Número'}
            placeholder={'Digite o número'}
            type={'number'}
          />
          <TextInput
            label={'Observações'}
            placeholder={'Digite observações adicionais'}
            type={'text'}
          />

          <TextInput
            label={'Porcentagem'}
            placeholder={'Informe a porcentagem'}
            type={'number'}
          />
          <InfoField label={'ID'} value={'Parceiro ID'} />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="bg-gradient-to-r from-button-linear-1 to-button-linear-2 text-white font-thin text-xs py-3 px-12 rounded-lg w-2/6"
        >
          Cadastrar Parceiro
        </button>
      </div>
    </form>
  );
}

export default FormRegister;
