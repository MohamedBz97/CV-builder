
import React, { useState, useEffect } from 'react';

const getStorageKey = (key: string, userId: string | null) => userId ? `user_${userId}_${key}` : null;

function useLocalStorage<T,>(key: string, initialValue: T, userId: string | null): [T, React.Dispatch<React.SetStateAction<T>>] {
  
  const [storedValue, setStoredValue] = useState<T>(() => {
    const storageKey = getStorageKey(key, userId);
    if (!storageKey) return initialValue;

    try {
      const item = window.localStorage.getItem(storageKey);
      if (!item) {
        window.localStorage.setItem(storageKey, JSON.stringify(initialValue));
        return initialValue;
      }
      
      const storedItem = JSON.parse(item);

      if (typeof initialValue === 'object' && initialValue !== null && !Array.isArray(initialValue)) {
          const ensureSchema = (defaultObj: any, storedObj: any): any => {
            if (typeof defaultObj !== 'object' || defaultObj === null || Array.isArray(defaultObj)) {
                return storedObj;
            }
            const result = { ...defaultObj, ...storedObj };
            for (const k in defaultObj) {
              if (Object.prototype.hasOwnProperty.call(defaultObj, k)) {
                const defaultValue = defaultObj[k];
                const storedValue = result[k];
                if (typeof defaultValue === 'object' && defaultValue !== null && !Array.isArray(defaultValue)) {
                  result[k] = ensureSchema(defaultValue, storedValue || {});
                }
              }
            }
            return result;
          };
          return ensureSchema(initialValue, storedItem);
      }
      return storedItem;
    } catch (error) {
      console.error(`Error reading localStorage key "${storageKey}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    const storageKey = getStorageKey(key, userId);
    if (!storageKey) {
        setStoredValue(initialValue);
        return;
    }
    
    try {
        const item = window.localStorage.getItem(storageKey);
        const parsedItem = item ? JSON.parse(item) : initialValue;
        
        if (!item) {
           window.localStorage.setItem(storageKey, JSON.stringify(initialValue));
        }
        
        setStoredValue(parsedItem);

    } catch(error) {
        console.error(`Error reading localStorage key "${storageKey}":`, error);
        setStoredValue(initialValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, key]);


  const setValue = (value: T | ((val: T) => T)) => {
    const storageKey = getStorageKey(key, userId);
    if (!storageKey) return;

    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(storageKey, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    const storageKey = getStorageKey(key, userId);
    if (!storageKey) return;

    const handleStorageChange = (e: StorageEvent) => {
        if (e.key === storageKey && e.newValue) {
            setStoredValue(JSON.parse(e.newValue));
        }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, userId]);

  return [storedValue, setValue];
}

export default useLocalStorage;
