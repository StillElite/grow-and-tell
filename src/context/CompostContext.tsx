import { createContext, useContext, useState, ReactNode } from 'react';
import {
  CompostBin,
  CompostType,
  compostBins as initialCompostBins,
} from '../mocks/mockdata';

interface CompostContextType {
  compostBins: CompostBin[];
  addCompostBin: (name: string, type: CompostType, notes: string) => void;
  updateCompostBin: (updatedBin: CompostBin) => void;
  deleteCompostBin: (id: string) => void;
}

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

export const CompostProvider = ({ children }: CompostProviderProps) => {
  const [compostBins, setCompostBins] =
    useState<CompostBin[]>(initialCompostBins);

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
        compostBin.id === updatedBin.id ? updatedBin : compostBin
      )
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
