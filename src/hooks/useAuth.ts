import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  // Garante que está no cliente
  if (typeof window === "undefined") {
    return;
  }

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Redireciona se o token não existir
      router.push("/Login");
    } else {
      
    }
  }, [router]);
};

export default useAuth;
