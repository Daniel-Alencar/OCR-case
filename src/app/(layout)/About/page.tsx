'use client';
import { useState, useEffect } from 'react';

import useAuth from '@/hooks/useAuth';
import Header from '@/components/Header/indexA';

interface CardData {
  title: string;
  content: string;
}

export default function About() {
  useAuth();


  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-full bg-primary">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
            <div
              className="bg-white p-6 px-12 rounded-lg shadow-lg"
            >
              <h3 className="flex text-xl font-semibold mb-4 justify-center items-center text-primary">
                {"card.title"}
              </h3>
              <p className="text-primary">{"card.content"}</p>
            </div>
        </div>
      </div>
    </>
  );
}
