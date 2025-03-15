'use client';

import React, { useState } from 'react';
import TextInput from './TextInput';

function FormRegister() {

  const submitForms = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data = {
      name: formData.get('Nome') as string,
      email: formData.get('Email') as string,
      password: formData.get('Senha') as string,
      passwordAgain: formData.get('Confirmar senha') as string,
    };

    if (data.password !== data.passwordAgain) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch('/api/consultants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Erro ao cadastrar consultor: ${errorData.error}`);
        return;
      }

      const result = await response.json();
      alert(`Consultor cadastrado com sucesso! ID: ${result.id}`);
    } catch (error) {
      alert('Erro inesperado. Tente novamente mais tarde.');
    }
  };

  return (
    <form
      className="container bg-background rounded-custom-1 p-7 w-1/3 flex flex-col gap-4"
      onSubmit={(event) => submitForms(event)}
    >
      <h4 className="font-bold text-primary mb-5">Novo Usuário</h4>

      <div className="flex">
        <div className="w-full grid grid-cols-1 gap-1 ">
          <TextInput
            label={'Nome'}
            placeholder={'Digite seu nome'}
            type={'text'}
          />
          <TextInput
            label={'Email'}
            type={'email'}
            placeholder={'Digite seu e-mail'}
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
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="bg-gradient-to-r from-button-linear-1 to-button-linear-2 text-white font-thin text-xs py-3 rounded-lg w-2/6"
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
}

export default FormRegister;
