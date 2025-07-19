import { createContext, useContext, useState, ReactNode } from 'react';
import { PlantingRecord } from '../mocks/mockdata';

interface PlantingHistoryContextType {
  plantingRecords: PlantingRecord[];
  addPlantingToHistory: (record: PlantingRecord) => void;
}

const PlantingHistoryContext = createContext<
  PlantingHistoryContextType | undefined
>(undefined);

interface PlantingHistoryProviderProps {
  children: ReactNode;
}

export const PlantingHistoryProvider = ({
  children,
}: PlantingHistoryProviderProps) => {};
