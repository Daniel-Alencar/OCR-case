import React from 'react';

interface Producer {
  id: number;
  name: string;
  culture?: string;
}

interface TableProps {
  data: Producer[];
}

const ProducersPartnerTable: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Cultura
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
                {producer.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {producer.culture}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProducersPartnerTable;
