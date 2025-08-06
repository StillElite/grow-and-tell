import { createContext, useContext, useState, ReactNode } from 'react';
import { PlantingRecord } from '../mocks/mockdata';

interface PlantingHistoryContextType {
  plantingRecords: PlantingRecord[];
  addPlantingToHistory: (record: PlantingRecord) => void;
  updateBedNameInHistory: (bedId: string, newName: string) => void;
  updateCropNameInHistory: (cropId: string, newName: string) => void;
  deletePlanting: (id: string) => void;
  deletePlantingsForBed: (bedId: string, cropIdsToDelete: string[]) => void;
  deletePlantingsByCropId: (cropId: string) => void;
}

const PlantingHistoryContext = createContext<
  PlantingHistoryContextType | undefined
>(undefined);

export const usePlantingHistoryContext = () => {
  const context = useContext(PlantingHistoryContext);
  if (!context) {
    throw new Error(
      'usePlantingHistoryContext must be used within a PlantingHistoryProvider'
    );
  }
  return context;
};

interface PlantingHistoryProviderProps {
  children: ReactNode;
}

export const PlantingHistoryProvider = ({
  children,
}: PlantingHistoryProviderProps) => {
  const [plantingRecords, setPlantingRecords] = useState<PlantingRecord[]>([]);

  const addPlantingToHistory = (record: PlantingRecord) => {
    setPlantingRecords((prev) => [...prev, record]);
  };

  const updateBedNameInHistory = (bedId: string, newName: string) => {
    setPlantingRecords((prev) =>
      prev.map((record) =>
        record.bedId === bedId ? { ...record, bedName: newName } : record
      )
    );
  };

  const updateCropNameInHistory = (cropId: string, newName: string) => {
    console.log('Updating crop name in history:', cropId, newName);
    setPlantingRecords((prev) =>
      prev.map((record) =>
        record.cropId === cropId ? { ...record, cropName: newName } : record
      )
    );
  };

  const deletePlanting = (id: string) => {
    setPlantingRecords((prev) => prev.filter((p) => p.id !== id));
  };

  const deletePlantingsForBed = (bedId: string, cropIdsToDelete: string[]) => {
    setPlantingRecords((prev) =>
      prev.filter(
        (record) =>
          record.bedId !== bedId || !cropIdsToDelete.includes(record.cropId)
      )
    );
  };

  const deletePlantingsByCropId = (cropId: string) => {
    setPlantingRecords((prev) => prev.filter((p) => p.cropId !== cropId));
  };

  return (
    <PlantingHistoryContext.Provider
      value={{
        plantingRecords,
        addPlantingToHistory,
        updateBedNameInHistory,
        updateCropNameInHistory,
        deletePlanting,
        deletePlantingsForBed,
        deletePlantingsByCropId,
      }}
    >
      {children}
    </PlantingHistoryContext.Provider>
  );
};
