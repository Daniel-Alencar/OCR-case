'use client';

import useAuth from '@/hooks/useAuth';
import Header from '@/components/Header/indexAbout';

export default function About() {
  useAuth();


  return (
    <div className="relative h-full">
      <div className="absolute top-0 flex flex-col">
        <div className='flex justify-between'>
          <Header/>
        </div>
        <p className='px-3 text-white'>Explore as funcionalidades :)</p>
      </div>
      <div className="flex h-full justify-center items-center bg-primary">
      </div>
    </div>
  );
  
}
