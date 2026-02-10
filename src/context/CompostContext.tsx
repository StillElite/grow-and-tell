import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { CompostBin, CompostType } from '../types/types';

interface CompostContextType {
  compostBins: CompostBin[];
  addCompostBin: (name: string, type: CompostType, notes: string) => void;
  updateCompostBin: (updatedBin: CompostBin) => void;
  deleteCompostBin: (id: string) => void;
}

const STORAGE_KEY = 'grow-tell:compostBins';

const CompostContext = createContext<CompostContextType | undefined>(undefined);

export const useCompostContext = () => {
  const context = useContext(CompostContext);
  if (!context) {
    throw new Error('useCompostContext must be used within a CompostProvider');
  }
  return context;
};

interface CompostProviderProps {
  children: ReactNode;
}

const loadFromStorage = (): CompostBin[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load compost bins from localStorage:', error);
    return [];
  }
};

const saveToStorage = (compostBins: CompostBin[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(compostBins));
  } catch (error) {
    console.error('Failed to save compost bins to localStorage:', error);
  }
};

export const CompostProvider = ({ children }: CompostProviderProps) => {
  const [compostBins, setCompostBins] = useState<CompostBin[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage after mount
  useEffect(() => {
    const loaded = loadFromStorage();
    setCompostBins(loaded);
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever compostBins change
  useEffect(() => {
    if (isLoaded) {
      saveToStorage(compostBins);
    }
  }, [compostBins, isLoaded]);

  const addCompostBin = (name: string, type: CompostType, notes: string) => {
    const newBin: CompostBin = {
      id: crypto.randomUUID(),
      name,
      type,
      status: 'Active',
      notes,
    };
    setCompostBins((prev) => [...prev, newBin]);
  };

  const updateCompostBin = (updatedBin: CompostBin) => {
    setCompostBins((prevBins) =>
      prevBins.map((compostBin) =>
        compostBin.id === updatedBin.id ? updatedBin : compostBin,
      ),
    );
  };

  const deleteCompostBin = (id: string) => {
    setCompostBins((prev) => prev.filter((compostBin) => compostBin.id !== id));
  };

  return (
    <CompostContext.Provider
      value={{
        compostBins,
        addCompostBin,
        updateCompostBin,
        deleteCompostBin,
      }}
    >
      {children}
    </CompostContext.Provider>
  );
};
