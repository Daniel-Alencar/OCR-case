'use client';

import { useRouter } from 'next/navigation';
import { 
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { getTokenPayload } from '@/lib/auth';

interface HeaderProps {
  mode?: boolean;
  title: string;
}

function Header({ mode = true, title = '' }: HeaderProps) {
  const router = useRouter();
  const decoded = getTokenPayload();

  const [username, setUsername] = useState<string>("");

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    router.push('/');
  };
  
  useEffect(() => {
    if(decoded) {
      setUsername(decoded.name);
    }
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between pb-6">
        <div className="flex gap-2 font-extrabold">
          <p>{title}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex justify-center gap-2">
            <div>{username}</div>
            <ArrowLeftOnRectangleIcon
              className="h-6 w-6 cursor-pointer text-gray-700"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
