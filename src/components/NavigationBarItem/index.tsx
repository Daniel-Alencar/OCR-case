import Image from 'next/image';
import Link from 'next/link';
import { StaticImageData } from 'next/image';
import { getTokenPayload } from '@/lib/auth';

import useAuth from '@/hooks/useAuth';
import { useState } from 'react';

interface NavigationBarItemProps {
  image: string | StaticImageData;
  alt: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
  href: string;
}

function NavigationBarItem({
  image,
  alt,
  description,
  isSelected,
  onSelect,
  href,
}: NavigationBarItemProps) {

  return (
    <Link href={href}>
      <div className="relative m-0 cursor-pointer" onClick={onSelect}>
        <div
          className={`flex items-center space-x-2 pl-6 pr-6 pt-2 pb-2 hover:bg-hover-1 
            ${isSelected ? 'bg-hover-1' : ''}`}
        >
          <div
            className={`absolute left-0 h-full w-1 rounded-br-md rounded-tr-md 
            ${isSelected && 'bg-[#8D0A75]'}`}
          ></div>
          <Image
            src={image}
            alt={alt}
            className={`w-6 h-6 ${
              isSelected ? 'text-[#8D0A75]' : 'text-foreground'
            }`}
            style={{
              filter: isSelected
                ? 'brightness(0) saturate(100%) hue-rotate(300deg)'
                : 'none',
            }}
          />
          <p
            className={`text-foreground text-12 ${
              isSelected ? 'text-[#8D0A75]' : ''
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default NavigationBarItem;
