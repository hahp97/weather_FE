import type { ReactNode } from 'react';
import { createContext, useContext, useRef } from 'react';
import { toast } from 'sonner';

type ToastOptions = Record<string, unknown>;

interface ToastContextType {
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const recentToastsRef = useRef<Map<string, number>>(new Map());
  const TOAST_DEBOUNCE_MS = 3000;

  const isDuplicateToast = (message: string): boolean => {
    const now = Date.now();
    const lastShown = recentToastsRef.current.get(message);

    if (lastShown && now - lastShown < TOAST_DEBOUNCE_MS) {
      return true;
    }

    recentToastsRef.current.set(message, now);
    return false;
  };

  const value: ToastContextType = {
    success: (message: string, options?: ToastOptions) => {
      if (!isDuplicateToast(message)) {
        toast.success(message, options);
      }
    },
    error: (message: string, options?: ToastOptions) => {
      if (!isDuplicateToast(message)) {
        toast.error(message, options);
      }
    },
    info: (message: string, options?: ToastOptions) => {
      if (!isDuplicateToast(message)) {
        toast.info(message, options);
      }
    },
    warning: (message: string, options?: ToastOptions) => {
      if (!isDuplicateToast(message)) {
        toast.warning(message, options);
      }
    },
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
