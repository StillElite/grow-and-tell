import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Season, SoilRecord } from '../types/types';

const STORAGE_KEY = 'grow-tell:soilRecords';

interface SoilRecordContextType {
  soilRecords: SoilRecord[];
  addSoilRecord: (name: string, season: Season) => void;
  updateSoilRecord: (updatedHarvest: SoilRecord) => void;
  deleteSoilRecord: (soilRecordId: string) => void;
}

const SoilRecordContext = createContext<SoilRecordContextType | undefined>(
  undefined,
);

export const useSoilRecordContext = (): SoilRecordContextType => {
  const context = useContext(SoilRecordContext);
  if (!context) {
    throw new Error(
      'useSoilRecordContext must be used within a SoilRecordProvider',
    );
  }
  return context;
};

interface SoilProviderProps {
  children: ReactNode;
}

const loadFromStorage = (): SoilRecord[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load soil records from localStorage:', error);
    return [];
  }
};

const saveToStorage = (soilRecords: SoilRecord[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(soilRecords));
  } catch (error) {
    console.error('Failed to save soil records to localStorage:', error);
  }
};

export const SoilRecordProvider = ({ children }: SoilProviderProps) => {
  const [soilRecords, setSoilRecords] = useState<SoilRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage after mount
  useEffect(() => {
    const loaded = loadFromStorage();
    setSoilRecords(loaded);
    setIsLoaded(true);
  }, []);
  // Save to localStorage whenever soilRecords change
  useEffect(() => {
    if (isLoaded) {
      saveToStorage(soilRecords);
    }
  }, [soilRecords, isLoaded]);

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
        soilRecord.id === updatedSoilRecord.id ? updatedSoilRecord : soilRecord,
      ),
    );
  };

  const deleteSoilRecord = (soilRecordId: string) => {
    setSoilRecords(
      soilRecords.filter((soilRecord) => soilRecord.id !== soilRecordId),
    );
  };

  return (
    <SoilRecordContext.Provider
      value={{ soilRecords, addSoilRecord, updateSoilRecord, deleteSoilRecord }}
    >
      {children}
    </SoilRecordContext.Provider>
  );
};
