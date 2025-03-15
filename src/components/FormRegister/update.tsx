import TextInput from './TextInput';
import SelectInput from './SelectInput';
import ImageInput from './ImageInput';
import InfoField from './InfoField';
import { useState } from 'react';
import ProducerImages from '../ProducerImages';

export const cultureOptions = [
  { value: 'opcao1', label: 'opcao1' },
  { value: 'opcao2', label: 'opcao2' },
  { value: 'opcao3', label: 'opcao3' },
];

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

interface Producer {
  id: number;
  name: string;
  phone: string;
  cnpj: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  number: string;
  zipCode: string;
  culture?: string;
  plantationSize?: string;
  consultantId: number;
  images: { id: number; producerId: number; imageData: string }[];
}

interface FormUpdateProps {
  producer: Producer;
  userType: string | undefined;
}

function FormUpdate({ producer, userType }: FormUpdateProps) {
  // Estado para imagens
  const [images, setImages] = useState<File[]>([]);

  const submitForms = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Criação do FormData
    const formDataEvent = new FormData(event.target as HTMLFormElement);
    const formData = new FormData();

    let data = {
      name: formDataEvent.get('Nome') as string,
      phone: formDataEvent.get('Telefone/whatsapp') as string,
      street: formDataEvent.get('Rua') as string,
      cnpj: formDataEvent.get('CNPJ') as string,
      neighborhood: formDataEvent.get('Bairro') as string,
      city: formDataEvent.get('Cidade') as string,
      state: formDataEvent.get('Estado/UF') as string,
      number: formDataEvent.get('Número') as string,
      zipCode: formDataEvent.get('CEP') as string,
      culture: formDataEvent.get('Cultura') as string,
      plantationSize: formDataEvent.get('Tamanho da plantação') as string,
    };

    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('cnpj', data.cnpj);
    formData.append('street', data.street);
    formData.append('neighborhood', data.neighborhood);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('number', data.number);
    formData.append('zipCode', data.zipCode);
    formData.append('culture', data.culture);
    formData.append('plantationSize', data.plantationSize);

    // Adicionar imagens ao FormData
    images.forEach((image) => {
      formData.append('images', image, image.name);
    });

    try {
      const response = await fetch(`/api/producers/${producer.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Erro ao atualizar produtor: ${errorData.error}`);
        return;
      }

      const result = await response.json();
      alert(`Produtor atualizado com sucesso! ID: ${result.id}`);
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
      <h4
        className="
        font-extrabold
        mb-5
      "
      >
        Informações do Produtor
      </h4>

      {userType && userType != 'consultant' && (
        <div className=" container flex px-8">
          <div className="px-8 flex-1">
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label={'Nome'}
                placeholder={'Enter name'}
                type={'text'}
                value={producer && producer.name}
              />
              <TextInput
                label={'Telefone/whatsapp'}
                type={'number'}
                placeholder={'Enter phone number'}
                value={producer && producer.phone}
              />
              <TextInput
                label={'CNPJ'}
                type={'text'}
                placeholder={'Enter CNPJ'}
                value={producer && producer.cnpj}
              />
              <TextInput
                label={'Tamanho da plantação'}
                placeholder={'Enter plantation size'}
                type={'number'}
                value={producer && producer.plantationSize}
              />
              <SelectInput
                label={'Cultura'}
                placeholder={'Select culture'}
                options={cultureOptions}
                value={producer && producer.culture}
              />
              <TextInput
                label={'Rua'}
                placeholder={'Enter street'}
                type={'text'}
                value={producer && producer.street}
              />
              <TextInput
                label={'Bairro'}
                placeholder={'Enter neighborhood'}
                type={'text'}
                value={producer && producer.neighborhood}
              />
              <TextInput
                label={'Cidade'}
                placeholder={'Enter city'}
                type={'text'}
                value={producer && producer.city}
              />
              <TextInput
                label={'CEP'}
                placeholder={'Enter CEP'}
                type={'text'}
                value={producer && producer.zipCode}
              />
              <SelectInput
                label={'Estado/UF'}
                placeholder={'Select Estado/UF'}
                options={stateOptions}
                value={producer && producer.state}
              />
              <TextInput
                label={'Número'}
                placeholder={'Enter number'}
                type={'number'}
                value={producer && producer.number}
              />
              <InfoField label={'ID'} value={producer && producer.id} />
            </div>
          </div>
        </div>
      )}

      <ProducerImages producer={producer && producer} />

      {userType && userType != 'consultant' && (
        <div>
          <button
            type="submit"
            className={`
              bg-gradient-to-r from-button-linear-1 to-button-linear-2 text-white 
              font-thin text-xs py-3 px-12 rounded-lg w-2/6
            `}
          >
            Atualizar Produtor
          </button>
        </div>
      )}
    </form>
  );
}

export default FormUpdate;
