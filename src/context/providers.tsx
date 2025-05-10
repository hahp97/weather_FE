import { ModalProvider } from "@/context/modal-context";
import { ToastProvider } from "@/context/toast-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: ReactNode;
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
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
            <Toaster position="top-right" richColors />
          </ModalProvider>
        </ToastProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
