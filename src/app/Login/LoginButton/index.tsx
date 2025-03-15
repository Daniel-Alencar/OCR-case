'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    // Tipagem explícita para evitar o erro
    const emailInput = document.getElementById(
      'email'
    ) as HTMLInputElement | null;
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement | null;

    // Verifica se os inputs existem antes de acessar seus valores
    const email = emailInput?.value || '';
    const password = passwordInput?.value || '';

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Armazena o token no localStorage ou cookie
        if (typeof window !== 'undefined') {
          // Acesse o localStorage aqui
          localStorage.setItem('token', data.token);
        }

        // Redireciona para o dashboard ou outra página
        router.push('/About');
      } else {
        setError(data.error || 'Erro ao fazer login. Tente novamente.');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="submit"
        onClick={handleLogin}
        disabled={loading}
        className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-fuchsia-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
