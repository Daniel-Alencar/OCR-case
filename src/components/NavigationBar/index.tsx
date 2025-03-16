'use client';

import Image from 'next/image';
import { useState } from 'react';

import logo from '../../public/assets/logo.png';
import dashboard from '../../public/assets/NavigationBar/Dashboard.svg';
import docs from '../../public/assets/NavigationBar/Docs.svg';

import NavigationBarItem from '../NavigationBarItem';

import useAuth from '@/hooks/useAuth';

const pagesInformations = [
  {
    href: '/About',
    image: dashboard,
    alt: 'Início',
    description: 'Início',
    name: 'Inicio',
  },
  {
    href: '/Documents',
    image: docs,
    alt: 'Imagens',
    description: 'Imagens',
    name: 'Imagens',
  }
];

function NavigationBar() {
  useAuth();

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
        <Image src={logo} alt="logo" className="w-20 mx-auto" />
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
        <p className="text-sm text-center text-foreground">© 2025 OCR + LLM</p>
      </div>
    </div>
  );
}

export default NavigationBar;
