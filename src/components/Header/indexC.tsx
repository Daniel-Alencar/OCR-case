import React from 'react';

function Home() {
  return (
    <section className="py-10 bg-white sm:py-12 lg:py-18">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            Como a Coep Vale funciona?
          </h2>
        </div>

        <div className="relative mt-12 lg:mt-20">
          <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
            <img
              className="w-full"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
              alt=""
            />
          </div>

          <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700"> 1 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-primary md:mt-10">
                Cadastre-se como consultor{' '}
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Preencha o formulário com suas informações profissionais e áreas
                de especialização. Faça parte da rede de especialistas da COEP
                Vale e contribua para o desenvolvimento do agronegócio no Vale
                do São Francisco.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700"> 2 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-primary md:mt-10">
                Conexão com produtores
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Com base no seu perfil, a COEP Vale conectará você a produtores
                que precisam da sua expertise. Trabalhe diretamente com quem
                precisa de soluções práticas e personalizadas.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700"> 3 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-primary md:mt-10">
                Impacte e cresça
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Ajudando produtores a superar desafios e melhorar seus
                resultados, você expande sua rede profissional, gera impacto
                positivo no setor e fortalece sua reputação como especialista.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
