'use client';

import { MOTION } from '@/constants/motion-constants';
import { Alert } from '@medusajs/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface IAlert {
  variant?: 'error' | 'success' | 'warning' | 'info';
  children: React.ReactNode;
}

interface IAlertContextType {
  alert: (alert: IAlert) => void;
}

interface IAlertContextProps {
  children: React.ReactNode;
}

export const AlertContext = createContext<IAlertContextType>({} as IAlertContextType);

const AlertProvider: React.FC<IAlertContextProps> = ({ children }) => {
  const [openedAlerts, setOpenedAlerts] = useState<IAlert[]>([]);

  const alert = useCallback(
    ({ children, variant = 'info' }: IAlert) => {
      setOpenedAlerts((prev) => [...prev, { children, variant }]);
    },
    [setOpenedAlerts]
  );

  useEffect(() => {
    if (openedAlerts.length > 3) {
      setOpenedAlerts((prev) => prev.slice(1));
    }

    if (openedAlerts.length > 0) {
      const timeout = setTimeout(() => {
        setOpenedAlerts((prev) => prev.slice(1));
      }, 2500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [openedAlerts]);

  const AlertContainer = () => {
    return (
      <div className="fixed z-50 flex flex-col items-center justify-center gap-1 transform -translate-x-1/2 bottom-5 left-1/2">
        <AnimatePresence>
          {openedAlerts.map((alert, index) => (
            <motion.div key={index} {...MOTION.POP}>
              <Alert variant={alert.variant}>{alert.children}</Alert>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <AlertContext.Provider
      value={{
        alert,
      }}
    >
      {children}
      <AlertContainer />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const { alert } = useContext(AlertContext);

  return { alert };
};

export default AlertProvider;
