'use client';

import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import SubHeader from '@/components/SubHeader';

import { getTokenPayload } from '@/lib/auth';
import FilterDocuments from '@/components/FilterDocuments';
import TableDocuments from '@/components/DocumentsTable';

import useAuth from '@/hooks/useAuth';

interface Document {
  id: number;
  name: string;
  url: string;
}

function DocumentsConsultant() {
  useAuth();
  const decoded = getTokenPayload();

  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [filterText, setFilterText] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async (consultantId: number) => {
      try {
        const response = await fetch(`/api/consultants/${consultantId}/document/search`);
        
        if (!response.ok) {
          throw new Error("Erro ao buscar documentos");
        }

        const data = await response.json();
        console.log(data);

        if (data.success) {
          setDocuments(data.documents);
        } else {
          setError("Nenhum documento encontrado.");
        }
      } catch (err) {
        setError("Erro ao buscar os documentos.");
      } finally {
        setLoading(false);
      }
    };

    if(decoded) {
      fetchDocuments(decoded.id);
    }
  }, []);

  // Filtro de produtores
  useEffect(() => {

    // Mudanças causadas pelo filterText
    const filteredDocuments = documents.filter(document => {
      return document.name.toLowerCase()
        .includes(filterText.toLowerCase());
    })

    setFilteredDocuments(filteredDocuments);
  }, [filterText, documents]);

  return (
    <>
      <Header title={'Documentos'} />
      <SubHeader />
      <FilterDocuments 
        documents={filteredDocuments}
        changeFilterText={setFilterText}
      />
      {
        error
        ? <p>Erro: {error}</p>
        : loading 
          ? <p>Carregando documentos...</p>
          : <TableDocuments documents={filteredDocuments} />
      }
    </>
  );
}

export default DocumentsConsultant;
