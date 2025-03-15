'use client';

import { AiOutlineClose } from 'react-icons/ai';
import NotificationCard from './NotificationCard';

interface Permission {
  id: number;
  notificationId: number;
  permission: { id: number; name: string; };
  permissionId: number;
}

export interface Notification {
  id: number;
  name: string;
  description: string;
  analyzed: boolean;
  useId: number;
  permissions: Permission[];
  objectInformations: any;
}

interface PopUpProps {
  title: string;
  notifications: Notification[];
  ref: any;
  setShowPopUp: any;
}

export default function NotificationPopUp({
  title,
  notifications = [],
  ref,
  setShowPopUp
}: PopUpProps) {

  const handleToClosePopUp = () => {
    setShowPopUp(false);
  }

  return (
    <div
      className={`z-10 h-full w-full bg-black bg-opacity-60 fixed right-0 top-0 flex justify-center items-center`}
    >
      <div
        ref={ref}
        className="z-20 border-0 border-transparent rounded-lg bg-white w-[500px] p-5 flex flex-col justify-between"
      >
        <div className='flex justify-between items-center'>
          <h4 className="text-lg font-bold">{title}</h4>
          <button 
            onClick={handleToClosePopUp}
            className="p-2 rounded-full hover:bg-gray-200 transition duration-300"
          >
            <AiOutlineClose className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className='py-3 max-h-80 flex flex-col gap-3 overflow-y-auto'>
        { notifications.length
          ?
            notifications.map(notification => {
              return (
                <>
                  <NotificationCard 
                    notification={notification}
                  />
                </>
              )
            })
          :
            <p>Sem notificações novas!</p>
        }
        </div>
      </div>
    </div>
  );
}
