'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import staffIcon from '../../public/assets/Header/Staff.svg';
import { 
  ArrowLeftOnRectangleIcon,
  BellAlertIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState, useRef } from 'react';
import NotificationPopUp from '../NotificationPopUp';
import { getTokenPayload } from '@/lib/auth';

interface HeaderProps {
  mode?: boolean;
  title: string;
}

function Header({ mode = true, title = '' }: HeaderProps) {
  const router = useRouter();
  const decoded = getTokenPayload();

  const userType = decoded?.userType;
  const userId = decoded?.id;
  const name = decoded?.name;

  const [showNotifications, setShowNotifications] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const popupRef = useRef<HTMLDivElement | null>(null);

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

  // Fecha o popup ao clicar fora
  useEffect(() => {

    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

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
      {
        showNotifications &&
        <NotificationPopUp 
          title='Notificações'
          notifications={notifications}
          ref={popupRef}
          setShowPopUp={setShowNotifications}
        />
      }
    </>
  );
}

export default Header;
