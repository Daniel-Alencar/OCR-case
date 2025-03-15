
export const getPermissions = async (managerId: number) => {
  const response = await fetch(`/api/admin/permission?managerId=${managerId}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar permissões");
  }
  return await response.json();
};
