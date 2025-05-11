import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

type ModalType = {
  component: ReactNode;
  props?: Record<string, unknown>;
};

type ModalContextType = {
  showModal: (component: ReactNode, props?: Record<string, unknown>) => void;
  hideModal: () => void;
  isOpen: boolean;
  current: ModalType | null;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<ModalType | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const showModal = (component: ReactNode, props?: Record<string, unknown>) => {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => {
        setCurrent({ component, props });
        setIsOpen(true);
      }, 300);
    } else {
      setCurrent({ component, props });
      setIsOpen(true);
    }
  };

  const hideModal = () => {
    setIsOpen(false);
    setTimeout(() => setCurrent(null), 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Ensure that we only close if clicking directly on the backdrop
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      hideModal();
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    // Stop event propagation to prevent it from reaching the backdrop
    e.stopPropagation();
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal, isOpen, current }}>
      {children}
      {current && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={handleBackdropClick}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto"
            onClick={handleContentClick}
          >
            {current.component}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
