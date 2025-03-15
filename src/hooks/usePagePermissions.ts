import { useEffect, useState } from 'react';
import { getPermissions } from '@/services/api/manager';

// Hook para verificar permissões
const usePagePermissions = (
  userType: string | null,
  userId: number | null,
  requiredPermissions: number[]
) => {
  const [access, setAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    if (userType === 'manager') {
      getPermissions(userId)
        .then((permissionsIds) => {
          const hasAccess = requiredPermissions.some((permission) =>
            permissionsIds.includes(permission)
          );
          setAccess(hasAccess);
        })
        .catch(() => setAccess(false))
        .finally(() => setLoading(false));
    } else if(userType === 'consultant') {
      // Permissões padrões de consultor
      // Arquivo 'settings.ts'
      const permissionsIds = [11];
      const hasAccess = requiredPermissions.some((permission) =>
        permissionsIds.includes(permission)
      );

      setAccess(hasAccess);
      setLoading(false);
    } else if(userType === 'partner') {
      // Permissões padrões de parceiro
      // Arquivo 'settings.ts'
      const permissionsIds = [15];
      const hasAccess = requiredPermissions.some((permission) =>
        permissionsIds.includes(permission)
      );

      setAccess(hasAccess);
      setLoading(false);
    }
  }, [userId, requiredPermissions]);

  return { access, loading };
};

export default usePagePermissions;
