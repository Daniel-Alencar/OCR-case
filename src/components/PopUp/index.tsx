'use client';

import { useEffect, useState } from 'react';
import DateInput from '@/components/DateInput';
import TextAreaInput from '@/components/TextAreaInput';
import { taskProps, statusOptions } from '@/components/TasksBoard/TaskBoardConsultant';
import { getTokenPayload } from '@/lib/auth';



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
}

interface PopUpProps {
  title: string;
  showPopUp: boolean;
  setShowPopUp: (show: boolean) => void;
  actionButton: (task: taskProps) => void;
  producers: Producer[];
}

export default function PopUp({
  title,
  showPopUp,
  actionButton,
  producers = [],
  setShowPopUp
}: PopUpProps) {
  const [showWindow, setShowWindow] = useState(showPopUp);
  const [textValue, setTextValue] = useState('');
  const [initialDate, setInitialDate] = useState<Date>(new Date());
  const [finalDate, setFinalDate] = useState<Date>(new Date());
  const [selectedProducer, setSelectedProducer] = useState<string>('');

  // Limpa todos os campos do popup
  const cleanData = () => {

    console.log("LIMPANDO...");
    setTextValue('');
    setInitialDate(new Date());
    setFinalDate(new Date());
    setSelectedProducer('');
  }

  const setShow = (value: boolean) => {
    setShowPopUp(value);
    setShowWindow(value);
  } 

  const decoded = getTokenPayload();

  useEffect(() => {
    cleanData();
    setShow(showPopUp);
  }, [showPopUp]);

  const getStatus = () => {
    const currentDate = new Date();

    if (
      initialDate instanceof Date &&
      !isNaN(initialDate.getTime()) &&
      finalDate instanceof Date &&
      !isNaN(finalDate.getTime())
    ) {
      if (currentDate <= initialDate) {
        return statusOptions[0][0];
      } else if (currentDate > initialDate && currentDate <= finalDate) {
        return statusOptions[1][0];
      } else if (currentDate > finalDate) {
        return statusOptions[2][0];
      }
    }
    return 'Status desconhecido';
  };

  const submitTask = async () => {
    if (!textValue || !initialDate || !finalDate || !selectedProducer) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const taskData = {
      task: textValue,
      initialDate: initialDate.toISOString(), // Converte para string ISO
      finalDate: finalDate.toISOString(), // Converte para string ISO
      status: getStatus(),
      producer: selectedProducer || null,
      consultant: String(decoded && decoded.id)
    };

    try {
      const response = await fetch('/api/tasks/consultant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Erro ao criar tarefa: ${errorData.error}`);
        return;
      }

      const result = await response.json();
      actionButton(result);

      
    } catch (error) {
      console.error('Erro ao enviar dados da tarefa:', error);
      alert('Erro inesperado. Tente novamente mais tarde.');
    }
    // Limpa todos os campos do popup
    cleanData();
  };

  return (
    <div
      className={`z-10 h-full w-full bg-black bg-opacity-60 fixed right-0 top-0 flex justify-center items-center ${
        showWindow ? '' : 'hidden'
      }`}
      // Fecha o pop-up ao clicar fora
      onClick={() => setShow(false)}
    >
      <div
        className="z-20 border-0 border-transparent rounded-lg bg-white w-[500px] p-5 flex flex-col justify-between"
        // Impede o fechamento ao clicar dentro do pop-up
        onClick={(e) => e.stopPropagation()} 
      >
        <h4 className="text-lg mb-3 font-bold">{title}</h4>

        {/* Campo para selecionar o produtor */}
        <select
          value={selectedProducer}
          onChange={(e) => {
            setSelectedProducer(e.target.value);
          }}
          className="mt-1 mb-5 p-2 border rounded-md w-full text-sm"
        >
          <option value="">Selecione um produtor</option>
          {producers.length > 0 ? (
            producers.map((producer) => (
              <option key={producer.id} value={producer.id}>
                {producer.name}
              </option>
            ))
          ) : (
            <option disabled>Sem produtores disponíveis</option>
          )}
        </select>

        <div>
          <DateInput name={'Data inicial'} setValue={setInitialDate} />
          <DateInput name={'Data final'} setValue={setFinalDate} />
        </div>

        <TextAreaInput name={'Descrição'} setValue={setTextValue} />

        <button
          onClick={submitTask}
          className="mt-4 w-1/1 bg-gradient-to-r from-button-linear-1 to-button-linear-2 text-white font-thin text-xs py-3 px-12 rounded-lg"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
