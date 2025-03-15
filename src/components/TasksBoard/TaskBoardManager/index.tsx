'use client';

import { useState, useEffect } from 'react';
import TaskItem from '@/components/TaskItem';
import PopUp from '@/components/PopUp/PopUpManager';

export interface taskProps {
  id: number;
  task: string;
  initialDate: Date;
  finalDate: Date;
  status: string;
}

export const statusOptions = [
  ['Backlog', 'Backlog'],
  ['Em andamento', 'Em andamento'],
  ['Atrasada', 'Atrasada'],
  ['Concluído', 'Concluído'],
];

interface TasksBoardProps {
  user: string;
  id: number;
}

function TasksBoardManager({ user, id }: TasksBoardProps) {
  const [tasks, setTasks] = useState<taskProps[]>([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedTask, setSelectedTask] = useState<taskProps | null>(null);

  // Função para buscar as tarefas da API
  const getTasks = async () => {
    try {
      const response = await fetch(`/api/tasks/manager?managerID=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Erro ao buscar tarefas: ${errorData.error}`);
        return [];
      }

      const result = await response.json();

      // Converte strings de data para objetos Date
      const tasksWithDates = result.map((task: any) => ({
        ...task,
        initialDate: new Date(task.initialDate),
        finalDate: new Date(task.finalDate),
      }));

      setTasks(tasksWithDates);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      alert('Erro inesperado. Tente novamente mais tarde.');
    }
  };

  const onDeleteTask = async (id: number) => {
    try {
      const response = await fetch('/api/tasks/manager', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        // Envia o ID no corpo da requisição
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Erro ao deletar tarefa: ${errorData.error}`);
        return;
      }

      // Atualiza a lista de tarefas para refletir a remoção
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      alert('Erro inesperado ao deletar tarefa. Tente novamente mais tarde.');
    }
  };

  const onUpdateTask = async (id: number, data: any) => {
    try {
      const response = await fetch('/api/tasks/manager', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // Envia o ID no corpo da requisição
        body: JSON.stringify({
          id,
          ...data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Erro ao atualizar tarefa: ${errorData.error}`);
        return;
      }

      // Atualiza a lista de tarefas para refletir a atualização
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      alert('Erro inesperado ao atualizar tarefa. Tente novamente mais tarde.');
    }
  };

  // Buscar tarefas ao montar o componente
  useEffect(() => {
    getTasks();
  }, []);

  // Adicionar nova tarefa
  const addTask = (task: taskProps) => {
    setTasks([...tasks, task]);
  };

  const createTask = (task: taskProps) => {
    const newTask = { ...task, status: statusOptions[0][0] };
    addTask(newTask);
    setShowPopUp(false);
  };

  // Mover tarefa entre colunas de status
  const moveTaskToColumn = (task: taskProps, newStatus: string) => {
    const updatedTasks = tasks.map((t) =>
      t.task === task.task ? { ...t, status: newStatus } : t
    );
    setTasks(updatedTasks);
    // Fecha os botões após o clique
    setSelectedTask(null);
  };

  // Agrupar tarefas por status
  const groupedTasks = statusOptions.map(([status, _]) => ({
    status,
    tasks: tasks.filter((task) => task.status === status),
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between pl-3">
        <div className="flex flex-col">
          <p className="font-extrabold text-xl text-text-4">
            {tasks.length} tarefas de gerência
          </p>
          <p className="text-xs text-text-5">{user}</p>
        </div>
        <button
          className="flex items-center justify-center w-72 h-12 border-2 border-dashed border-button-linear-1 rounded-lg hover:bg-purple-100"
          onClick={(e) => {
            e.stopPropagation();
            setShowPopUp(true);
          }}
        >
          <span className="text-button-linear-2 text-2xl">+</span>
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6">
        {groupedTasks.map((group, index) => (
          <div
            key={index}
            className="flex flex-col w-72 p-3 bg-white rounded-lg shadow-md"
          >
            <h3 className="font-semibold text-lg text-gray-700 mb-4">
              {group.status}
            </h3>
            <div className="space-y-4">
              {group.tasks.length === 0 ? (
                <p className="text-center text-gray-400">Sem tarefas</p>
              ) : (
                group.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTask(task);
                    }}
                  >
                    <TaskItem
                      status={task.status}
                      task={task.task}
                      initialDate={task.initialDate} // Passando o objeto Date
                      finalDate={task.finalDate} // Passando o objeto Date
                      id={task.id}
                      onDelete={() => onDeleteTask(task.id)}
                    />

                    {selectedTask?.task === task.task && (
                      <div className="flex justify-around mt-2">
                        {statusOptions.map(
                          ([status, label]) =>
                            status !== task.status && (
                              <button
                                key={status}
                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xs"
                                onClick={() => {
                                  moveTaskToColumn(task, status);
                                  onUpdateTask(task.id, { status: status });
                                }}
                              >
                                {label}
                              </button>
                            )
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {showPopUp && (
        <PopUp
          title="Adicionar tarefa"
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          actionButton={createTask}
        />
      )}
    </div>
  );
}

export default TasksBoardManager;
