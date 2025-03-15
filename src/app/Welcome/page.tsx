import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/assets/coep.png';

function Welcome() {
  return (
    <section>
      <div>
        <div className="flex h-screen items-center justify-center bg-white p-5">
          <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-10 md:px-10">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-primary">
                {' '}
                Bem-vindo(a) a <span className="text-green-700">Coep Vale</span>
              </h1>
              <p className="mb-6 text-primary">
                Na Coep Vale, conectamos produtores como você a consultores
                especializados que entendem os desafios do dia a dia no campo.
                Aqui, você encontra soluções simples e práticas para melhorar
                sua produção, reduzir custos e aproveitar novas oportunidades.
              </p>
              <div className="flex justify-center space-x-5">
                <Link href="/ConsultantRegisterInitialPage">
                  <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary p-5 py-3 font-semibold text-white hover:bg-green-900">
                    Fazer cadastro
                  </button>
                </Link>
                <Link href="/Login">
                  <button className="flex w-full items-center justify-center gap-1 rounded-2xl bg-primary p-5 py-3 font-semibold text-white hover:bg-purple-900">
                    Login
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image src={logo} alt="logo" className="max-w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Welcome;
