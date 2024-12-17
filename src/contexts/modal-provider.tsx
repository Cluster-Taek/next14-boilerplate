'use client';

import React, { createContext, useCallback, useEffect, useState } from 'react';

export interface ModalComponentType {
  id: React.Key;
  component: React.ReactNode;
}

interface ModalContextType {
  openedModals: ModalComponentType[];
  openModal: (modalComponent: ModalComponentType) => void;
  closeModal: (id: React.Key) => void;
}

interface ModalContextProps {
  children: React.ReactNode;
}

export const ModalContext = createContext<ModalContextType>({} as ModalContextType);

const ModalProvider: React.FC<ModalContextProps> = ({ children }) => {
  const [openedModals, setOpenedModals] = useState<ModalComponentType[]>([]);

  const openModal = useCallback((props: ModalComponentType) => {
    setOpenedModals((modals) => {
      return [...modals, { ...props }];
    });
  }, []);

  const closeModal = useCallback((id: React.Key) => {
    setOpenedModals((modals) => {
      return modals.filter((modal) => modal.id !== id);
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = openedModals.length > 0 ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openedModals]);

  useEffect(() => {
    const handleRouteChange = () => {
      setOpenedModals([]);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <ModalContext.Provider
      value={{
        openedModals,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
