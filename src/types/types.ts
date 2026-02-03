// --------------------
// Home / Features
// --------------------

export interface Feature {
  title: string;
  description: string;
  image: string;
  alt?: string;
  comingSoon?: boolean;
}

export interface PlanningFeatureCard extends Feature {
  viewKey: ViewKey;
}

export enum ViewKey {
  Dashboard = 'Dashboard',
  Beds = 'Beds',
  PlantLog = 'Plant Log',
  Compost = 'Compost',
  Tasks = 'Tasks',
  Harvest = 'Harvest',
  SoilRecord = 'Soil Record',
}

// --------------------
// Beds / Crops
// --------------------

export interface Crop {
  name: string;
  datePlanted: string;
  notes?: string;
  id: string;
}

export interface Bed {
  id: string;
  name: string;
  size: string;
  crops: Crop[];
  notes?: string;
}

// --------------------
// Plant Log Mock Data
// --------------------
export interface PlantingRecord {
  id: string;
  cropId: string;
  cropName: string;
  bedId: string;
  bedName: string;
  datePlanted: string;
  notes?: string;
}

// --------------------
// (Compost)
// --------------------

export type CompostType = 'Worm' | 'Leaf' | 'Hot' | 'Cold';
export type CompostStatus = 'Active' | 'Ready' | 'Emptied' | '';

export interface CompostBin {
  id: string;
  type: CompostType;
  name: string;
  status: CompostStatus;
  notes?: string;
}

// --------------------
// (Tasks)
// --------------------

export type TaskCategory =
  | 'plant-care'
  | 'growth-support'
  | 'harvest'
  | 'soil-compost'
  | 'misc';

export type TaskFrequency = 'daily' | 'weekly' | 'monthly';
export type TaskType = 'default' | 'custom';

export interface Task {
  id: string;
  name: string;
  category: TaskCategory;
  frequency: TaskFrequency;
  completed: boolean;
  type: TaskType;
  hidden?: boolean;
  factoryHidden: boolean; // immutable baseline
}

// --------------------
// (Harvest)
// --------------------

export type HarvestCategory =
  | 'Leafy greens'
  | 'Fruiting veggies'
  | 'Herbs'
  | 'Roots';

export type HarvestUnit = 'lbs' | 'bunches' | 'count';

export interface Harvest {
  id: string;
  name: string;
  quantity: number;
  unit: HarvestUnit;
  category: HarvestCategory;
  dateHarvested: string;
}

// --------------------
// Soil Record
// --------------------
export interface SoilTest {
  id: string;
  pH: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  dateTested: string;
}

export type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter';

export type SoilAmendmentType =
  | 'Compost'
  | 'Manure'
  | 'Worm Tea'
  | 'Mulch'
  | 'Cover Crop'
  | 'Leaf mold';

export interface SoilRecord {
  id: string;
  name: string;
  season: Season;
  amendments: SoilAmendmentType[];
  tests: SoilTest[];
}
