import Link from 'next/link';
import React from 'react';

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

interface TableProps {
  data: Producer[];
  userType: string | undefined;
}

const TableProducer: React.FC<TableProps> = ({ data, userType }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
            {userType && userType != 'consultant' && (
              <>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Telefone
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  CNPJ
                </th>
              </>
            )}
            <th className="border border-gray-300 px-4 py-2 text-left">
              Cultura
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Tamanho da plantação (m²)
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Cidade
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">UF</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Informações
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((producer) => (
            <tr
              key={producer.id}
              className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
            >
              <td className="border border-gray-300 px-4 py-2">
                {producer.id.toString().padStart(2, '0')}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {producer.name}
              </td>
              {userType && userType != 'consultant' && (
                <>
                  <td className="border border-gray-300 px-4 py-2">
                    {producer.phone}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {producer.cnpj}
                  </td>
                </>
              )}
              <td className="border border-gray-300 px-4 py-2">
                {producer.culture}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {producer.plantationSize}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {producer.city}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {producer.state}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  legacyBehavior
                  href={`Producers/${producer.id}/Information`}
                >
                  <a className="text-purple-800 hover:underline">
                    Ver informações
                  </a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableProducer;
