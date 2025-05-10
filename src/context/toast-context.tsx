import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { toast } from "sonner";

// Define our own ToastOptions since Sonner doesn't export it
type ToastOptions = Record<string, unknown>;

interface ToastContextType {
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const value: ToastContextType = {
    success: (message: string, options?: ToastOptions) =>
      toast.success(message, options),
    error: (message: string, options?: ToastOptions) =>
      toast.error(message, options),
    info: (message: string, options?: ToastOptions) =>
      toast.info(message, options),
    warning: (message: string, options?: ToastOptions) =>
      toast.warning(message, options),
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
