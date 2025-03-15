import React, { useState } from 'react';

interface Partner {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  razaoSocial?: string;
  porcentagem?: string;
  producers?: Producer[]; // 🔥 Agora inclui os produtores associados
}

interface Producer {
  id: number;
  name: string;
}

interface TablePartnerProps {
  data: Partner[];
  onAddProducer: (partnerId: number, producerId: number) => void;
  onRemoveProducer: (partnerId: number, producerId: number) => void; // 🔥 Nova função para remover produtores
  producers: Producer[];
}

const TablePartner: React.FC<TablePartnerProps> = ({
  data,
  onAddProducer,
  onRemoveProducer,
  producers,
}) => {
  const [selectedProducer, setSelectedProducer] = useState<{
    [key: number]: number;
  }>({});

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Nome</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Telefone</th>
          <th className="p-2 border">Cidade</th>
          <th className="p-2 border">Estado</th>
          <th className="p-2 border">Razão Social</th>
          <th className="p-2 border">Porcentagem</th>
          <th className="p-2 border">Produtores</th>
        </tr>
      </thead>
      <tbody>
        {data.map((partner) => (
          <tr key={partner.id} className="hover:bg-gray-100">
            <td className="p-2 border">{partner.name}</td>
            <td className="p-2 border">{partner.email}</td>
            <td className="p-2 border">{partner.phone}</td>
            <td className="p-2 border">{partner.city}</td>
            <td className="p-2 border">{partner.state}</td>
            <td className="p-2 border">{partner.razaoSocial || '-'}</td>
            <td className="p-2 border">{partner.porcentagem || '-'}</td>

            <td className="p-2 border">
              <select
                className="border p-1"
                value={selectedProducer[partner.id] || ''}
                onChange={(e) =>
                  setSelectedProducer({
                    ...selectedProducer,
                    [partner.id]: Number(e.target.value),
                  })
                }
              >
                <option value="">Selecione</option>
                {producers.map((producer) => (
                  <option key={producer.id} value={producer.id}>
                    {producer.name}
                  </option>
                ))}
              </select>
              <button
                className="ml-2 p-1 bg-blue-500 text-white rounded"
                onClick={() =>
                  selectedProducer[partner.id] &&
                  onAddProducer(partner.id, selectedProducer[partner.id])
                }
              >
                +
              </button>
              {/* Lista de produtores já associados */}
              <ul className="mt-2">
                {partner.producers?.map((producer) => (
                  <li
                    key={producer.id}
                    className="flex items-center justify-between"
                  >
                    {producer.name}
                    <button
                      className="ml-2 p-1 bg-red-500 text-white rounded"
                      onClick={() => onRemoveProducer(partner.id, producer.id)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablePartner;
