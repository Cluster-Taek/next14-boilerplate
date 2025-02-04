import { useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      console.log(error);
    }
  });

  const setValue = (value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    value: state,
    setValue,
  };
};

export default useLocalStorage;
