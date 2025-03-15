'use client';

import { permissions } from '@/settings';
import { Notification } from '../../NotificationPopUp'; 
import { useState } from 'react';

interface NotificationCardrops {
  notification: Notification;
}

export default function NotificationCard({
  notification
}: NotificationCardrops) {

  const [notChoosed, setNotChoosed] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const acceptOrRecuseConsultor = async (
    consultorId: number, accepted: boolean
  ) => {
    try {
      const response = await fetch(`/api/consultants/${consultorId}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          accepted: accepted,
          notificationId: notification.id
        }),
      });
      if (!response.ok) {
        throw new Error('Erro ao aceitar ou recusar o consultor!');
      }
      const data = await response.json();

      setNotChoosed(false);
      setResponseMessage(data.message);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  const acceptOrRecuseProducer = async (
    consultantId: number, producerId: number, accepted: boolean
  ) => {
    try {
      const response = await fetch(
        `/api/consultants/acceptProducer`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            accepted: accepted,
            notificationId: notification.id,
            consultantId: consultantId,
            producerId: producerId
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Erro ao aceitar ou recusar o produtor!');
      }
      const data = await response.json();

      setNotChoosed(false);
      setResponseMessage(data.message);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  const handleButton = (
    notification: Notification, accept: boolean
  ) => {
    // Verificar a permissão da notificação
    
    console.log(notification);
    const notificationPermissions = notification.permissions;
    console.log("Permissões da notificação:", notificationPermissions);

    const { 
      consultorId, 
      consultantId,
      producerID
    } = notification.objectInformations;

    const firstPermission = notificationPermissions[0].permission.name;
    
    if(firstPermission == permissions[0]) {
      // É uma notificação para aceitar o consultor ou não
      acceptOrRecuseConsultor(consultorId, accept);
    } else if(firstPermission == permissions[10]) {
      // É uma notificação para aceitar a associação do consultor com um produtor
      acceptOrRecuseProducer(consultantId, producerID, accept);
    }
  }

  const handleAnalysedNotification = async (
    notification: Notification, analysed: boolean
  ) => {
    try {
      const response = await fetch(
        `/api/notifications`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            analysed: analysed,
            notificationId: notification.id,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Erro ao atualizar notificação!');
      }
      const data = await response.json();

      setNotChoosed(false);
      setResponseMessage(data.message);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido.');
    } finally {
      setLoading(false);
    }
  }

  return(
    <div className="
      max-w-md mx-auto bg-white shadow-lg 
      rounded-lg"
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl text-gray-800 mb-2">
          {notification.name}
        </div>
        <p className="text-gray-600 text-base">
          {notification.description}
        </p>
      </div>
      <div className="px-6 py-4 flex justify-between">
        {
          notification.permissions[0].permissionId != 16
          ?
            <>
              {
                notChoosed &&
                <button
                  onClick={() => handleButton(notification, true)}
                  className="bg-green-500 text-white 
                    px-4 py-2 rounded-lg hover:bg-green-600 
                    transition duration-300"
                >
                  Aceitar
                </button>
              }
              {
                notChoosed &&
                <button
                  onClick={() => handleButton(notification, false)}
                  className="bg-red-500 text-white 
                    px-4 py-2 rounded-lg hover:bg-red-600 
                    transition duration-300"
                >
                  Recusar
                </button>
              }
              
            </>
          :
            <>
            {
              notChoosed &&
                <button
                  onClick={() => handleAnalysedNotification(notification, true)}
                  className="bg-green-500 text-white 
                    px-4 py-2 rounded-lg hover:bg-green-600 
                    transition duration-300"
                >
                  Ok
                </button>
              }
            </>
        }
        {
          responseMessage && responseMessage
        }
        
      </div>
    </div>
  )
}