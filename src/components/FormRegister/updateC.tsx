import TextInput from './TextInput';
import InfoField from './InfoField';
import { useState } from 'react';
import { areaOptions } from './indexC';

interface Consultant {
  id: number;
  name: string;
  email: string;
  phone: string;
  areaOfActivity: string;
  availability: string;
  description: string;
  state: string;
}

interface FormUpdateProps {
  consultant: Consultant;
}

function FormUpdateConsultant({ consultant }: FormUpdateProps) {
  const [] = useState<File[]>([]);

  const submitForms = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formDataEvent = new FormData(event.target as HTMLFormElement);
    const formData = new FormData();

    let data = {
      name: formDataEvent.get('Nome') as string,
      email: formDataEvent.get('Email') as string,
      phone: formDataEvent.get('Telefone/whatsapp') as string,
      areaOfActivity: formDataEvent.get('Área de Atuação') as string,
      availability: formDataEvent.get('Disponibilidade') as string,
      description: formDataEvent.get('Descrição') as string,
    };

    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('areaOfActivity', data.areaOfActivity);
    formData.append('availability', data.availability);
    formData.append('description', data.description);

    try {
      const response = await fetch(`/api/consultants/${consultant.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Erro ao atualizar consultor: ${errorData.error}`);
        return;
      }

      const result = await response.json();
      alert(`Consultor atualizado com sucesso! ID: ${result.id}`);
    } catch (error) {
      console.error('Erro ao enviar dados do formulário:', error);
      alert('Erro inesperado. Tente novamente mais tarde.');
    }
  };

  return (
    <form
      className="
        bg-background rounded-custom-1 p-7 w-full
        flex flex-col gap-4
      "
      onSubmit={(event) => submitForms(event)}
    >
      <h4 className="font-extrabold mb-5">Informações do Consultor</h4>

      <div className="container flex px-8">
        <div className="px-8 flex-1">
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label={'Nome'}
              placeholder={'Enter name'}
              type={'text'}
              value={consultant && consultant.name}
            />
            <TextInput
              label={'Email'}
              type={'email'}
              placeholder={'Enter email'}
              value={consultant && consultant.email}
            />
            <TextInput
              label={'Telefone/whatsapp'}
              type={'number'}
              placeholder={'Enter phone number'}
              value={consultant && consultant.phone}
            />
            <TextInput
              label={'Área de Atuação'}
              placeholder={'Enter area of activity'}
              value={consultant && consultant.areaOfActivity}
            />
            <TextInput
              label={'Disponibilidade'}
              placeholder={'Enter availability'}
              value={consultant && consultant.availability}
            />
            <TextInput
              label={'Descrição'}
              placeholder={'Enter description'}
              value={consultant && consultant.description}
            />

            <InfoField label={'ID'} value={consultant && consultant.id} />
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className={`bg-gradient-to-r from-button-linear-1 to-button-linear-2 text-white 
            font-thin text-xs py-3 px-12 rounded-lg w-2/6`}
        >
          Atualizar Consultor
        </button>
      </div>
    </form>
  );
}

export default FormUpdateConsultant;
