'use client';
import { jwtDecode, JwtPayload } from "jwt-decode";

interface TokenPayload extends JwtPayload {
  id: number; 
  email: string;
  name: string;
}

export function getTokenPayload(): TokenPayload | null {
  if (typeof window !== 'undefined') {
    // Recupera o token do localStorage
    const token = localStorage.getItem("token");
    
    if (!token) {
      return null
    }
  
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded;
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return null; 
    }
  } else {
    return null;
  }
}