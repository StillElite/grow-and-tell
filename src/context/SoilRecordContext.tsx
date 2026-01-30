import { createContext, useContext, useState, ReactNode } from 'react';
import { Season, SoilRecord } from '../mocks/mockdata';

interface SoilRecordContextType {
  soilRecords: SoilRecord[];
  addSoilRecord: (name: string, season: Season) => void;
  updateSoilRecord: (updatedHarvest: SoilRecord) => void;
  //   deleteHarvest: (harvestId: string) => void;
}

const SoilRecordContext = createContext<SoilRecordContextType | undefined>(
  undefined
);

export const useSoilRecordContext = (): SoilRecordContextType => {
  const context = useContext(SoilRecordContext);
  if (!context) {
    throw new Error(
      'useSoilRecordContext must be used within a SoilRecordProvider'
    );
  }
  return context;
};

interface SoilProviderProps {
  children: ReactNode;
}
export const SoilRecordProvider = ({ children }: SoilProviderProps) => {
  const [soilRecords, setSoilRecords] = useState<SoilRecord[]>([]);

  const addSoilRecord = (name: string, season: Season) => {
    const newSoilRecord: SoilRecord = {
      id: crypto.randomUUID(),
      name,
      season,
      amendments: [],
      tests: [],
    };
    setSoilRecords([...soilRecords, newSoilRecord]);
  };

  const updateSoilRecord = (updatedSoilRecord: SoilRecord) => {
    setSoilRecords(
      soilRecords.map((soilRecord) =>
        soilRecord.id === updatedSoilRecord.id ? updatedSoilRecord : soilRecord
      )
    );
  };

  //   const deleteHarvest = (harvestId: string) => {
  //     setHarvests(harvests.filter((harvest) => harvest.id !== harvestId));
  //   };

  return (
    <SoilRecordContext.Provider
      value={{ soilRecords, addSoilRecord, updateSoilRecord }}
    >
      {children}
    </SoilRecordContext.Provider>
  );
};
