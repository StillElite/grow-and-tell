// --------------------
// Interfaces
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

//
// --------------------
// Homepage Features
// --------------------

export const features: FeatureCard[] = [
  {
    title: 'Beds',
    description:
      "Create and organize your garden beds, and track exactly what's planted in each one. Build a clear structure so you always know what's growing where.",
    image: '/images/bed-icon2.png',
    alt: 'Garden bed fence icon',
  },
  {
    title: 'Compost',
    description:
      'Keep track of your composting efforts — log layers, turning, and moisture updates. Build healthier soil by managing your bins the smart way.',
    image: '/images/compost-icon2.png',
    alt: 'Wheelbarrow icon for composting',
  },
  {
    title: 'Seasonal Tasks',
    description:
      'Plan ahead with simple seasonal checklists and timely reminders. Know the best moments to plant, harvest, and prepare your beds year-round.',
    image: '/images/clock-icon2.png',
    alt: 'Clock icon for seasonal tasks',
    comingSoon: true,
  },
  {
    title: 'Seed Inventory',
    description:
      "Record which seeds you have, track planting success, and decide what to replant next season. Build a living history of your garden's growth.",
    image: '/images/seed-icon2.png',
    alt: 'Seed icon for seed inventory',
    comingSoon: true,
  },
];

//
// --------------------
// Dashboard – Plan Your Garden Section
// --------------------

export enum ViewKey {
  Dashboard = 'Dashboard',
  Beds = 'Beds',
  PlantLog = 'Plant Log',
  Compost = 'Compost',
  Tasks = 'Tasks',
}

//
// --------------------
// Garden Bed Mock Data
// --------------------
export const beds: Bed[] = [
  {
    id: '1',
    name: 'North Bed',
    size: '4x8',
    notes: 'Partial shade in afternoon.',
    crops: [
      {
        id: 'crop-1a',
        name: 'Tomatoes',
        datePlanted: '2025-06-15',
        notes: 'Started from seeds in the Bounty',
      },
      {
        id: 'crop-2a',
        name: 'Basil',
        datePlanted: '2025-05-01',
      },
      {
        id: 'crop-3a',
        name: 'Peppers',
        datePlanted: '2025-05-01',
      },
      {
        id: 'crop-4a',
        name: 'Zucchini',
        datePlanted: '2025-06-20',
        notes: 'Planted recently',
      },
    ],
  },
  {
    id: '2',
    name: 'South Bed',
    size: '3x6',
    notes: 'Partial shade in afternoon.',
    crops: [
      {
        id: 'crop-4',
        name: 'Carrots',
        datePlanted: '2025-04-10',
        notes: 'Direct seeded',
      },
      {
        id: 'crop-5',
        name: 'Lettuce',
        datePlanted: '2025-04-12',
      },
      {
        id: 'crop-1b',
        name: 'Tomatoes',
        datePlanted: '2025-04-15',
      },
      {
        id: 'crop-2b',
        name: 'Basil',
        datePlanted: '2025-04-18',
      },
      {
        id: 'crop-3b',
        name: 'Peppers',
        datePlanted: '2025-04-20',
      },
      {
        id: 'crop-6b',
        name: 'Okra',
        datePlanted: '2025-05-25',
        notes: 'Testing warm-weather growth',
      },
    ],
  },
  {
    id: '3',
    name: 'Herb Bed',
    size: '2x4',
    notes: '',
    crops: [
      {
        id: 'crop-6',
        name: 'Thyme',
        datePlanted: '2025-03-20',
      },
      {
        id: 'crop-7',
        name: 'Oregano',
        datePlanted: '2025-03-22',
        notes: 'Needs trimming',
      },
      {
        id: 'crop-8',
        name: 'Parsley',
        datePlanted: '2025-03-25',
      },
      {
        id: 'crop-9b',
        name: 'Cilantro',
        datePlanted: '2025-03-20',
      },
    ],
  },
  {
    id: '4',
    name: 'East Bed',
    size: '4x4',
    notes: '',
    crops: [
      {
        id: 'crop-9',
        name: 'Cucumbers',
        datePlanted: '2025-04-18',
        notes: 'Trellised',
      },
      {
        id: 'crop-10',
        name: 'Radishes',
        datePlanted: '2025-04-20',
      },
    ],
  },
  {
    id: '5',
    name: 'West Bed',
    size: '5x10',
    notes: 'New compost added this year.',
    crops: [
      {
        id: 'crop-11',
        name: 'Corn',
        datePlanted: '2025-04-25',
      },
      {
        id: 'crop-12',
        name: 'Green Beans',
        datePlanted: '2025-04-28',
        notes: 'Sprouted quickly',
      },
      {
        id: 'crop-13',
        name: 'Garlic',
        datePlanted: '2024-12-15',
        notes: 'Overwintered',
      },
    ],
  },
  {
    id: '6',
    name: 'Empty Bed',
    size: '3x3',
    notes: '',
    crops: [],
  },
];

//
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

// (Compost)

export type CompostType = 'Worm' | 'Leaf' | 'Hot' | 'Cold';
export type CompostStatus = 'Active' | 'Ready' | 'Emptied' | '';

export const compostStatusOptions: { value: CompostStatus; label: string }[] = [
  { value: 'Active', label: 'Active' },
  { value: 'Ready', label: 'Ready' },
  { value: 'Emptied', label: 'Emptied' },
];

export interface CompostBin {
  id: string;
  type: CompostType;
  name: string;
  status: CompostStatus;
  notes?: string;
}

export const compostBins: CompostBin[] = [
  {
    id: 'bin-001',
    type: 'Hot',
    name: 'Back Corner Hot Pile',
    status: 'Active',
    notes: 'Turned last week; running warm.',
  },
  {
    id: 'bin-002',
    type: 'Leaf',
    name: 'Leaf Mold Bin',
    status: 'Active',
    notes: 'Mostly shredded oak leaves.',
  },
  {
    id: 'bin-003',
    type: 'Worm',
    name: 'Vermi Tower',
    status: 'Ready',
    notes: 'Casting tray nearly full.',
  },
  {
    id: 'bin-004',
    type: 'Cold',
    name: 'Yard Waste Pile',
    status: 'Active',
    notes: 'Slow build; minimal maintenance.',
  },
  {
    id: 'bin-005',
    type: 'Hot',
    name: 'Chip & Manure Mix',
    status: 'Active',
    notes: 'Needs browns soon.',
  },
];

// --------------------
// Seasonal Tasks Mock Data
// mocks/tasks.ts
export type TaskCategory =
  | 'plant-care'
  | 'growth-support'
  | 'harvest'
  | 'soil-compost'
  | 'misc';
export type TaskFrequency = 'daily' | 'weekly' | 'monthly';
export type TaskKind = 'default' | 'custom';

export type Task = {
  id: string;
  name: string;
  category: TaskCategory;
  frequency: TaskFrequency;
  completed: boolean;
  kind: TaskKind;
};

export const tasks: Task[] = [
  {
    id: '1',
    name: 'Check soil moisture / water plants',
    category: 'plant-care',
    frequency: 'daily',
    completed: false,
    kind: 'default',
  },
  {
    id: '2',
    name: 'Inspect plants for pests or helpers',
    category: 'plant-care',
    frequency: 'daily',
    completed: false,
    kind: 'default',
  },
  {
    id: '3',
    name: 'Prune and remove spent blooms',
    category: 'plant-care',
    frequency: 'weekly',
    completed: false,
    kind: 'default',
  },
  {
    id: '4',
    name: 'Check leaves for signs of disease',
    category: 'plant-care',
    frequency: 'weekly',
    completed: false,
    kind: 'default',
  },
  {
    id: '5',
    name: 'Hand-pollinate blossoms if needed',
    category: 'growth-support',
    frequency: 'weekly',
    completed: false,
    kind: 'default',
  },
  {
    id: '6',
    name: 'Secure vines or stems to trellis',
    category: 'growth-support',
    frequency: 'weekly',
    completed: false,
    kind: 'default',
  },
  {
    id: '7',
    name: 'Thin overcrowded seedlings',
    category: 'growth-support',
    frequency: 'monthly',
    completed: false,
    kind: 'default',
  },
  {
    id: '8',
    name: 'Harvest ripe produce',
    category: 'harvest',
    frequency: 'weekly',
    completed: false,
    kind: 'default',
  },
  {
    id: '9',
    name: 'Check compost moisture and progress',
    category: 'soil-compost',
    frequency: 'weekly',
    completed: false,
    kind: 'default',
  },
];
