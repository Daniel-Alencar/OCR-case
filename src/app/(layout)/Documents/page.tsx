'use client';

import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import Layout from '@/components/Layout';
import SubHeader from '@/components/SubHeader';

import useAuth from '@/hooks/useAuth';
import { getTokenPayload } from '@/lib/auth';
import FilterDocuments from '@/components/FilterDocuments';
import TableDocuments from '@/components/DocumentsTable';
import DocumentsConsultant from './DocumentsConsuntant/page';
import DocumentsManager from './DocumentsManager/page';

export default function Documents() {
  useAuth();

  return <DocumentsConsultant />
}