import { Footer } from '@/components/layout/Footer';
import { cn } from '@/utils/cn';
import { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

export function Layout({ children, fullWidth = false, className }: LayoutProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col min-h-screen w-full bg-gradient-to-br from-blue-50 to-gray-100',
        className
      )}
    >
      <Header />
      <main className="flex-1 overflow-auto w-full">
        <div
          className={cn(fullWidth ? 'w-full' : 'max-w-4xl mx-auto', 'px-4 sm:px-6 py-4 md:py-6')}
        >
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
