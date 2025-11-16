import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { TopBar } from './TopBar';
import { FloatingAI } from './FloatingAI';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="pt-14 pb-16 min-h-screen">
        {children}
      </main>
      <BottomNav />
      <FloatingAI />
    </div>
  );
};
