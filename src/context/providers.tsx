import { ModalProvider } from '@/context/modalContext';
import { ToastProvider } from '@/context/toastContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
      staleTime: 5 * 60 * 1000,
      gcTime: 60 * 60 * 1000, // 1 hour
      refetchOnMount: true,
    },
  },
});

export function Providers({ children }: ProvidersProps) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <ModalProvider>
            {children}
            <Toaster
              position="top-right"
              richColors
              theme="light"
              toastOptions={{
                className: 'bg-white text-gray-800 dark:bg-gray-800 dark:text-white',
                closeButton: true,
                duration: 5000,
                style: {
                  borderRadius: '8px',
                  padding: '16px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                },
              }}
            />
          </ModalProvider>
        </ToastProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
