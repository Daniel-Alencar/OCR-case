'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import arrowLeftIcon from '../../public/assets/Header/Arrow left.svg';

function SubHeader() {
  const router = useRouter();

  const handleBack = () => {
    // Redireciona para a página anterior
    router.back();
  };

  return (
    <div
      className="
        flex flex-row justify-between pb-6
      "
    >
      <button className="flex items-center gap-1" onClick={handleBack}>
        <Image src={arrowLeftIcon} alt="Arrow Left Icon" />
        <p
          className="
            text-sm text-transparent bg-clip-text bg-gradient-to-r from-button-linear-1 to-button-linear-2
          "
        >
          Voltar
        </p>
      </button>
    </div>
  );
}

export default SubHeader;
