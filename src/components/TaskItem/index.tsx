import React from 'react';

interface TaskItemProps {
  status: string;
  task: string;
  initialDate: Date;
  finalDate: Date;
  id: number;
  producerName?: string;
  onDelete: (id: number) => void;
}

const TaskItem = ({
  status,
  task,
  initialDate,
  finalDate,
  id,
  producerName,
  onDelete,
}: TaskItemProps) => {
  const formatDate = (date: Date) => {
    // Verifica se a data é indefinida
    if (!date) return '';

    const day = String(date.getUTCDate()).padStart(2, '0');
    // Mês é baseado em 0 (Janeiro é 0)
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div
      className="relative flex flex-col p-4 bg-white rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
      style={{
        borderLeft: `4px solid ${getStatusColor(status)}`,
      }}
    >
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        // Passando o id como número
        onClick={() => onDelete(Number(id))}
        aria-label="Excluir tarefa"
      >
        ✖
      </button>

      <h4 className="font-medium text-gray-800 break-words">{task}</h4>
      {producerName && (
        <p className="text-sm text-gray-500 font-bold">
          Produtor: {producerName}
        </p>
      )}

      <p className="text-sm text-gray-500">
        {formatDate(initialDate)} - {formatDate(finalDate)}
      </p>
      <div className="mt-2 text-xs text-gray-400">{status}</div>
    </div>
  );
};

// Função para retornar a cor de acordo com o status
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Backlog':
      return '#FBBF24'; // Amarelo
    case 'Em andamento':
      return '#3B82F6'; // Azul
    case 'Atrasada':
      return '#EF4444'; // Vermelho
    case 'Concluído':
      return '#10B981'; // Verde
    default:
      return '#9CA3AF'; // Cinza
  }
};

export default TaskItem;
