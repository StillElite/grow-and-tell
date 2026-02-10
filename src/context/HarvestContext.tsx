import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Harvest, HarvestCategory, HarvestUnit } from '../types/types';

const STORAGE_KEY = 'grow-tell:harvests';

interface HarvestContextType {
  harvests: Harvest[];
  addHarvest: (
    name: string,
    quantity: number,
    dateHarvested: string,
    unit: HarvestUnit,
    category: HarvestCategory,
  ) => void;
  updateHarvest: (updatedHarvest: Harvest) => void;
  deleteHarvest: (harvestId: string) => void;
}

const HarvestContext = createContext<HarvestContextType | undefined>(undefined);

export const useHarvestContext = (): HarvestContextType => {
  const context = useContext(HarvestContext);
  if (!context) {
    throw new Error('useHarvestContext must be used within a HarvestProvider');
  }
  return context;
};

interface HarvestProviderProps {
  children: ReactNode;
}

const loadFromStorage = (): Harvest[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load harvests from localStorage:', error);
    return [];
  }
};

const saveToStorage = (harvests: Harvest[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(harvests));
  } catch (error) {
    console.error('Failed to save harvests to localStorage:', error);
  }
};

export const HarvestProvider = ({ children }: HarvestProviderProps) => {
  const [harvests, setHarvests] = useState<Harvest[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage after mount
  useEffect(() => {
    const loaded = loadFromStorage();
    setHarvests(loaded);
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever harvests change
  useEffect(() => {
    if (isLoaded) {
      saveToStorage(harvests);
    }
  }, [harvests, isLoaded]);

  const addHarvest = (
    name: string,
    quantity: number,
    dateHarvested: string,
    unit: HarvestUnit,
    category: HarvestCategory,
  ) => {
    const newHarvest: Harvest = {
      id: crypto.randomUUID(),
      name,
      quantity,
      dateHarvested,
      unit,
      category,
    };
    setHarvests([...harvests, newHarvest]);
  };

  const updateHarvest = (updatedHarvest: Harvest) => {
    setHarvests(
      harvests.map((harvest) =>
        harvest.id === updatedHarvest.id ? updatedHarvest : harvest,
      ),
    );
  };

  const deleteHarvest = (harvestId: string) => {
    setHarvests(harvests.filter((harvest) => harvest.id !== harvestId));
  };

  return (
    <HarvestContext.Provider
      value={{ harvests, addHarvest, updateHarvest, deleteHarvest }}
    >
      {children}
    </HarvestContext.Provider>
  );
};
