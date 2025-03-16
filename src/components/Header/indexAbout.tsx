'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

function Header() {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    router.push('/');
  };

  return (
    <div className="flex justify-end items-center gap-4 pb-6 bg-primary p-2">
      <ArrowLeftOnRectangleIcon
        className="h-6 w-6 cursor-pointer text-white"
        onClick={handleLogout}
      />
    </div>
  );
}

export default Header;
