import { TaskCategory, TaskFrequency } from '../types/types';
import type { Option } from '../components/shared/forms/SelectFormField';

export const TASK_CATEGORY_OPTIONS: Option<TaskCategory>[] = [
  { value: 'plant-care', label: 'Plant Care' },
  { value: 'growth-support', label: 'Growth Support' },
  { value: 'harvest', label: 'Harvest' },
  { value: 'soil-compost', label: 'Soil & Compost' },
  { value: 'misc', label: 'Miscellaneous' },
];

export const TASK_FREQUENCY_OPTIONS: Option<TaskFrequency>[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];
