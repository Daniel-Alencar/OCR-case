import NavigationBar from '../NavigationBar';

// Definindo o tipo de 'children' como 'React.ReactNode'
interface LayoutProps {
  children: React.ReactNode; // Tipo adequado para 'children'
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex gap-0 w-full">
      <NavigationBar />
      <div className="m-4" style={{ width: `calc(100% - ${200}px)` }}>
        {children}
      </div>
    </div>
  );
}
