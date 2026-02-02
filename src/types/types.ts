// Central domain types for Grow & Tell
// (No runtime data in this file)

// --------------------
// Grouped Features
// --------------------

export interface FeatureCard {
  title: string;
  description: string;
  image: string;
  alt?: string;
  comingSoon?: boolean;
}

export interface PlanningFeatureCard extends FeatureCard {
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
