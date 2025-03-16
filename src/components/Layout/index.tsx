import NavigationBar from '../NavigationBar';

interface LayoutProps {
  children: React.ReactNode;
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
