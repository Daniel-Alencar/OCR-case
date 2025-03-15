import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Counter from '../../public/assets/Consultors/counter.png';

interface Producer {
  id: number;
  name: string;
}

interface ConsultorCardProps {
  id: number;
  name: React.ReactNode;
  description: string;
  productorsQuantity: number;
  consultantProducers: Producer[];
  producers: Producer[];
  onAddProducer: (
    consultantId: number, consultantName: string, 
    producerId: number, producerName: string
  ) => void;
  onRemoveProducer: (consultantId: number, producerId: number) => void;
  consultantName: string;
}

export default function ConsultorCard({
  id,
  name,
  description,
  productorsQuantity,
  consultantProducers,
  producers,
  consultantName,
  onAddProducer,
  onRemoveProducer,
}: ConsultorCardProps) {
  const [showProducers, setShowProducers] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducerss = useMemo(() => {
    // Filtra os produtores cujo nome inclui o termo de busca
    const filterTextProducers = producers.filter((producer) =>
      producer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Filtra novamente, removendo os que estão em consultantProducers
    return filterTextProducers.filter(
      (producer) => !consultantProducers.some((other) => other.id === producer.id)
    );
  }, [searchTerm, producers]);

  const toggleProducers = () => setShowProducers(!showProducers);

  return (
    <div className="w-[450px] bg-background p-6 rounded-xl">
      <div className="flex items-center justify-between border-b border-foreground">
        <h3 className="text-xl font-bold">{name}</h3>
        <p
          className={`text-xs p-1 rounded-lg text-center ${
            productorsQuantity <= 3
              ? 'bg-background-green-signal text-green-signal'
              : 'bg-background-red-signal text-red-signal'
          }`}
        >
          {productorsQuantity <= 3 ? 'Disponível' : 'Indisponível'}
        </p>
      </div>
      <div className="py-7 text-text-3">
        <p>{description}</p>
      </div>
      <div className="flex justify-end gap-2 text-text-5">
        <Image alt="Contador de produtores" src={Counter} />
        <p>{productorsQuantity} produtores</p>
      </div>

      <button
        onClick={toggleProducers}
        className={`mt-4 w-full py-2 rounded-lg transition-all ${
          showProducers
            ? 'bg-gray-300 text-black'
            : 'bg-primary text-white hover:bg-secondary'
        }`}
      >
        {showProducers ? 'Ocultar Produtores' : 'Ver Produtores'}
      </button>

      {showProducers && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <h4 className="font-bold mb-2">Produtores:</h4>
          {consultantProducers && consultantProducers.length > 0 ? (
            <ul className="list-disc pl-5">
              {consultantProducers.map((producer, index) => (
                <li
                  key={index}
                  className="mb-1 flex justify-between items-center"
                >
                  <span>{producer && producer.name}</span>
                  <button
                    onClick={() => onRemoveProducer(id, producer.id)}
                    className="ml-2 bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Não há produtores disponíveis.</p>
          )}

          <h4 className="font-bold mt-4 mb-2">Adicionar Produtores:</h4>
          <input
            type="text"
            placeholder="Buscar produtores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-lg mb-4"
          />

          {filteredProducerss.length > 0 ? (
            <ul className="list-disc pl-5">
              {filteredProducerss.map((producer, index) => (
                <li
                  key={index}
                  className="mb-1 flex justify-between items-center"
                >
                  <span>{producer && producer.name}</span>
                  <button
                    onClick={
                      () => onAddProducer(
                        id, consultantName, producer.id, producer.name
                      )
                    }
                    className="ml-2 bg-secondary text-white py-1 px-2 rounded-lg hover:bg-secondary-1"
                  >
                    Adicionar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">
              Nenhum produtor encontrado para adicionar.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
