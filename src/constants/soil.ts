import { Season } from '../types/types';
import type { Option } from '../components/shared/forms/SelectFormField';

export const SOIL_SEASON_OPTIONS: Option<Season>[] = [
  { value: 'Spring', label: 'Spring' },
  { value: 'Summer', label: 'Summer' },
  { value: 'Fall', label: 'Fall' },
  { value: 'Winter', label: 'Winter' },
];
