'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowLeftOnRectangleIcon,
  BellAlertIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState, useRef } from 'react';
import { getTokenPayload } from '@/lib/auth';

function Header() {
  const router = useRouter();
  const decoded = getTokenPayload();

  const userId = decoded?.id;
  const userType = decoded?.userType;

  const [showNotifications, setShowNotifications] = useState(false);
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

  const handleNotification = () => {
    setShowNotifications((prev) => !prev);
  };

  const fetchNotifications = async (userId: number) => {
    try {
      const response = await fetch(
        userType === 'manager'
          ? `/api/notifications?managerId=${userId}`
          : `/api/notifications?consultantId=${userId}`,
        {
          method: 'GET',
        }
      );
      if (!response.ok) {
        throw new Error('Erro ao buscar notificações.');
      }
      const data = await response.json();
      setNotifications(data.notifications);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (decoded) {
      fetchNotifications(decoded.id);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

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
