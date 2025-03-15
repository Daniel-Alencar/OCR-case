import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/assets/coep.png';

function Welcome() {
  return (
    <section>
      <div>
        <div className="flex h-screen items-center justify-center bg-white p-5">
          <div className="grid md:grid-cols-1 grid-cols-1 items-center gap-10 md:px-10">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-primary">
                {' '}
                Bem-vindo(a) a <span className="text-green-700">OCR + LLM</span>
              </h1>
              <p className="mb-6 text-primary">
                Aplicação de caso de uso com OCR
              </p>
              <div className="flex space-x-5">
                <Link href="/ConsultantRegisterInitialPage">
                  <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary p-5 py-3 font-semibold text-white hover:bg-green-900">
                    Cadastro
                  </button>
                </Link>
                <Link href="/Login">
                  <button className="flex w-full items-center justify-center gap-1 rounded-2xl bg-primary p-5 py-3 font-semibold text-white hover:bg-purple-900">
                    Autenticação
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Welcome;
