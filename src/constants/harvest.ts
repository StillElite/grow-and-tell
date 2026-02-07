import { HarvestCategory } from '../types/types';
import type { Option } from '../components/shared/forms/SelectFormField';

export const HARVEST_CATEGORY_OPTIONS: Option<HarvestCategory>[] = [
  { value: 'Leafy greens', label: 'Leafy greens' },
  { value: 'Fruiting veggies', label: 'Fruiting veggies' },
  { value: 'Herbs', label: 'Herbs' },
  { value: 'Roots', label: 'Roots' },
];

export const HARVEST_CATEGORIES = [
  'Leafy greens',
  'Fruiting veggies',
  'Herbs',
  'Roots',
] as const;
