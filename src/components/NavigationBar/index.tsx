'use client';

import Image from 'next/image';
import { useState } from 'react';

import logo from '../../public/assets/coep.png';
import dashboard from '../../public/assets/NavigationBar/Dashboard.svg';
import maintenance from '../../public/assets/NavigationBar/Maintenance.svg';
import staff from '../../public/assets/NavigationBar/Staff.svg';
import docs from '../../public/assets/NavigationBar/Docs.svg';
import tasks from '../../public/assets/NavigationBar/Tasks.svg';
import register from '../../public/assets/NavigationBar/Register.svg';
import privacy from '../../public/assets/NavigationBar/Privacy.svg';
import partners from '../../public/assets/NavigationBar/Partners.svg';

import NavigationBarItem from '../NavigationBarItem';
import { getTokenPayload } from '@/lib/auth';

import useAuth from '@/hooks/useAuth';
import usePagePermissions from '@/hooks/usePagePermissions';

const pagesInformations = [
  {
    href: '/About',
    image: dashboard,
    alt: 'Início',
    description: 'Início',
    name: 'inicio',
  },
  {
    href: '/Documents',
    image: docs,
    alt: 'Documentos',
    description: 'Documentos',
    name: 'documentos',
  }
];

function NavigationBar() {
  useAuth();

  const decoded = getTokenPayload();
  const userId = decoded?.id ? decoded.id : null;
  const userType = decoded?.userType ? decoded.userType : null;

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div
      className="
        h-screen w-66 w-min-66 bg-background text-white 
        flex flex-col justify-between
        sticky top-0 left-0
      "
    >
      <div className="p-4">
        <Image src={logo} alt="logo" className="w-32 mx-auto" />
      </div>

      <div className="flex flex-col flex-1 gap-0">
        {pagesInformations.map((page) => {
          return (
            <NavigationBarItem
              key={page.href}
              href={page.href}
              image={page.image}
              alt={page.alt}
              description={page.description}
              isSelected={selectedItem === page.name}
              onSelect={() => handleSelect(page.name)}
            />
          );
        })}
      </div>

      <div className="p-4">
        <p className="text-sm text-center text-foreground">© 2025 Case OCR</p>
      </div>
    </div>
  );
}

export default NavigationBar;
