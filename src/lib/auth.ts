'use client';
import { jwtDecode, JwtPayload } from "jwt-decode";

// Tipagem para os dados do payload do token
interface TokenPayload extends JwtPayload {
  // Ajuste conforme o payload do seu token
  id: number; 
  email: string;
  name: string;
  userType: string;
}

export function getTokenPayload(): TokenPayload | null {
  // Recupera o token do localStorage
  if (typeof window !== 'undefined') {
    // Acesse o localStorage aqui
    const token = localStorage.getItem("token");
    
    if (!token) {
      // Retorna null se o token não existir
      return null
    }
  
    try {
      // Decodifica o token e retorna o payload
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded;
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      // Retorna null se o token for inválido
      return null; 
    }
  } else {
    return null;
  }
}