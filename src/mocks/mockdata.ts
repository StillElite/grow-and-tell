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

export const getPlanningFeatureCards = (beds: Bed[]): PlanningFeatureCard[] => {
  const totalCrops = beds.reduce((sum, bed) => sum + bed.crops.length, 0);

  return [
    {
      title: 'Beds',
      description: `${beds.length} Active`,
      image: '/images/garden-bed-icon.png',
      viewKey: ViewKey.Beds,
    },
    {
      title: 'Plant Log',
      description: `${totalCrops} Entries`,
      image: '/images/planting-icon.png',
      viewKey: ViewKey.PlantLog,
    },
    {
      title: 'Compost',
      description: '2 Bins',
      image: '/images/compost-icon3.png',
      viewKey: ViewKey.Compost,
    },
    {
      title: 'Tasks',
      description: 'Coming soon',
      image: '/images/task-icon.png',
      viewKey: ViewKey.Tasks,
      comingSoon: true,
    },
  ];
};

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

export type Outcome = 'Successful' | 'Poor' | 'Failed';

export type PlantingLog = {
  id: string;
  cropName: string;

  datePlanted: string;
  harvestedDate: string;
  bedName: string;
  notes?: string;
  outcome?: Outcome;
};

export const mockPlantings: PlantingLog[] = [
  {
    id: '1',
    cropName: 'Tomatoes',
    datePlanted: '2025-05-30',
    harvestedDate: '2025-08-12',
    bedName: 'Bed 1',
    notes: 'Possibly not enough sun',
    outcome: 'Poor',
  },
  {
    id: '2',
    cropName: 'Broccoli',
    datePlanted: '2025-04-08',
    harvestedDate: '2025-06-03',
    bedName: 'Bed 2',
    notes: 'May have been overcrowded',

    outcome: 'Successful',
  },
  {
    id: '3',
    cropName: 'Squash',
    datePlanted: '2025-06-20',
    harvestedDate: '2025-08-20',
    bedName: 'Bed 1',
    notes: 'Overwatered',
    outcome: 'Failed',
  },
  {
    id: '4',
    cropName: 'Tomatoes',
    datePlanted: '2025-05-15',
    harvestedDate: '2025-08-10',
    bedName: 'Bed 3',
    notes: 'Roma variety',
    outcome: 'Successful',
  },
  {
    id: '5',
    cropName: 'Peppers',
    datePlanted: '2025-05-28',
    harvestedDate: '2025-08-15',
    bedName: 'Bed 2',
    notes: 'Thrived in partial sun',
    outcome: 'Successful',
  },
  {
    id: '6',
    cropName: 'Lettuce',
    datePlanted: '2025-03-20',
    harvestedDate: '2025-04-15',
    bedName: 'Bed 1',
    notes: 'Bolted early',
    outcome: 'Failed',
  },
  {
    id: '7',
    cropName: 'Tomatoes',
    datePlanted: '2025-05-18',
    harvestedDate: '2025-08-11',
    bedName: 'Bed 2',
    notes: 'Heirloom – small fruit',
    outcome: 'Poor',
  },
];
