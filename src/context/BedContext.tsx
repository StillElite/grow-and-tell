import { createContext, useContext, useState, ReactNode } from 'react';
import { beds as initialBeds } from '../mocks/mockdata';
import { Bed, Crop } from '../types/types';

interface BedContextType {
  beds: Bed[];
  addBed: (name: string, size: string, notes: string) => void;
  updateBed: (updatedBed: Bed) => void;
  deleteBed: (bedId: string) => void;
  addCrop: (bedId: string, crop: Crop) => void;
  updateCrop: (bedId: string, updatedCrop: Crop) => void;
  deleteCrop: (bedId: string, cropId: string) => void;
}

const BedContext = createContext<BedContextType | undefined>(undefined);

export const useBedContext = (): BedContextType => {
  const context = useContext(BedContext);
  if (!context) {
    throw new Error('useBedContext must be used within a BedProvider');
  }
  return context;
};

interface BedProviderProps {
  children: ReactNode;
}

export const BedProvider = ({ children }: BedProviderProps) => {
  const [beds, setBeds] = useState<Bed[]>(initialBeds);

  const addBed = (name: string, size: string, notes: string) => {
    const newBed: Bed = {
      id: crypto.randomUUID(),
      name,
      size,
      notes,
      crops: [],
    };
    setBeds((prevBeds) => [...prevBeds, newBed]);
  };

  const updateBed = (updatedBed: Bed) => {
    setBeds((prevBeds) =>
      prevBeds.map((bed) => (bed.id === updatedBed.id ? updatedBed : bed)),
    );
  };

  const deleteBed = (bedId: string) => {
    setBeds((prevBeds) => prevBeds.filter((bed) => bed.id !== bedId));
  };

  const addCrop = (bedId: string, crop: Crop) => {
    setBeds((prevBeds) =>
      prevBeds.map((bed) =>
        bed.id === bedId ? { ...bed, crops: [...bed.crops, crop] } : bed,
      ),
    );
  };

  const updateCrop = (bedId: string, updatedCrop: Crop) => {
    setBeds((prevBeds) =>
      prevBeds.map((bed) => {
        if (bed.id !== bedId) return bed;

        const updatedCrops = bed.crops.map((crop) =>
          crop.id === updatedCrop.id ? updatedCrop : crop,
        );

        return {
          ...bed,
          crops: updatedCrops,
        };
      }),
    );
  };

  const deleteCrop = (bedId: string, cropId: string) => {
    setBeds((prevBeds) =>
      prevBeds.map((bed) =>
        bed.id === bedId
          ? {
              ...bed,
              crops: bed.crops.filter((crop) => crop.id !== cropId),
            }
          : bed,
      ),
    );
  };

  return (
    <BedContext.Provider
      value={{
        beds,
        addBed,
        updateBed,
        deleteBed,
        addCrop,
        updateCrop,
        deleteCrop,
      }}
    >
      {children}
    </BedContext.Provider>
  );
};
