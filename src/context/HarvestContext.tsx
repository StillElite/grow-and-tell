import { createContext, useContext, useState, ReactNode } from 'react';
import { Harvest, HarvestCategory, HarvestUnit } from '../mocks/mockdata';

interface HarvestContextType {
  harvests: Harvest[];
  addHarvest: (
    name: string,
    quantity: number,
    dateHarvested: string,
    unit: HarvestUnit,
    category: HarvestCategory
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
export const HarvestProvider = ({ children }: HarvestProviderProps) => {
  const [harvests, setHarvests] = useState<Harvest[]>([]);

  const addHarvest = (
    name: string,
    quantity: number,
    dateHarvested: string,
    unit: HarvestUnit,
    category: HarvestCategory
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
        harvest.id === updatedHarvest.id ? updatedHarvest : harvest
      )
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
