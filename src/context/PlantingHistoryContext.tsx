import { createContext, useContext, useState, ReactNode } from 'react';
import { PlantingRecord } from '../mocks/mockdata';
import { subtractDays } from '../utils/dateMatch';
import { capitalize } from '../utils/capitalize';

interface PlantingHistoryContextType {
  plantingRecords: PlantingRecord[];
  filteredPlantings: PlantingRecord[];
  cropFilter: string[];
  bedFilter: string[];
  dateFilter: DateRangeKey;
  cropOptions: string[];
  bedOptions: string[];
  dateOptions: DateRangeKey[];
  setCropFilter: (value: string[]) => void;
  setBedFilter: (value: string[]) => void;
  setDateFilter: (value: DateRangeKey) => void;
  clearFilters: () => void;
  addPlantingToHistory: (record: PlantingRecord) => void;
  updateBedNameInHistory: (bedId: string, newName: string) => void;
  updateCropNameInHistory: (cropId: string, newName: string) => void;
  deletePlanting: (id: string) => void;
  deletePlantingsForBed: (bedId: string, cropIdsToDelete: string[]) => void;
  deletePlantingsByCropId: (cropId: string) => void;
}

export type DateRangeKey =
  | 'Past 7 Days'
  | 'Past 30 Days'
  | 'Past 3 Months'
  | 'Past 6 Months';

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
  const [cropFilter, setCropFilter] = useState<string[]>([]);
  const [bedFilter, setBedFilter] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<DateRangeKey | null>(null);

  const clearFilters = () => {
    setCropFilter([]);
    setBedFilter([]);
    setDateFilter(null);
  };

  const cropOptions = Array.from(
    new Set(plantingRecords.map((p) => capitalize(p.cropName)))
  ).sort();

  const bedOptions = Array.from(
    new Set(plantingRecords.map((p) => capitalize(p.bedName)))
  ).sort();

  const dateOptions: DateRangeKey[] = [
    'Past 7 Days',
    'Past 30 Days',
    'Past 3 Months',
    'Past 6 Months',
  ];

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

  const filteredPlantings = plantingRecords.filter((p) => {
    const matchesCrop = cropFilter.length
      ? cropFilter.includes(capitalize(p.cropName))
      : true;

    const matchesBed = bedFilter.length
      ? bedFilter.includes(capitalize(p.bedName))
      : true;

    const matchesDate = (() => {
      if (!dateFilter) return true;

      const plantedDate = new Date(p.datePlanted);

      switch (dateFilter) {
        case 'Past 7 Days':
          return plantedDate >= subtractDays(7);
        case 'Past 30 Days':
          return plantedDate >= subtractDays(30);
        case 'Past 3 Months':
          return plantedDate >= subtractDays(90);
        case 'Past 6 Months':
          return plantedDate >= subtractDays(180);
        default:
          return true;
      }
    })();

    return matchesCrop && matchesBed && matchesDate;
  });

  return (
    <PlantingHistoryContext.Provider
      value={{
        plantingRecords,
        filteredPlantings,
        cropFilter,
        bedFilter,
        dateFilter,
        cropOptions,
        bedOptions,
        dateOptions,
        setCropFilter,
        setBedFilter,
        setDateFilter,
        clearFilters,
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
