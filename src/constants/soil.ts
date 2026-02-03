import { Season } from '../types/types';
import type { Option } from '../components/shared/forms/SelectFormField';

export const SOIL_SEASON_OPTIONS: Option<Season>[] = [
  { value: 'Spring', label: 'Spring' },
  { value: 'Summer', label: 'Summer' },
  { value: 'Fall', label: 'Fall' },
  { value: 'Winter', label: 'Winter' },
];

export const SOIL_PH_OPTIONS: Option<string>[] = [
  { value: '7.5', label: 'Alkaline (7.5)' },
  { value: '7.0', label: 'Neutral (7.0)' },
  { value: '6.5', label: 'Slight Acidic (6.5)' },
  { value: '6.0', label: 'Acidic (5.5-6.0)' },
  { value: '5.0', label: 'Very Acidic (4.5-5.0)' },
];

export const SOIL_NUTRIENT_LEVELS: Option<string>[] = [
  { value: '4', label: 'Surplus (4)' },
  { value: '3', label: 'Sufficient (3)' },
  { value: '2', label: 'Adequate (2)' },
  { value: '1', label: 'Deficient (1)' },
  { value: '0', label: 'Depleted (0)' },
];
