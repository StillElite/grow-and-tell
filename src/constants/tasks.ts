import { Task, TaskCategory, TaskFrequency } from '../types/types';
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

// Default task IDs are stable, factory-defined identifiers.
// User-created tasks use UUIDs.
export const tasks: Task[] = [
  {
    id: '1',
    name: 'Check soil moisture / water plants',
    category: 'plant-care',
    frequency: 'daily',
    completed: false,
    type: 'default',
    hidden: false,
    factoryHidden: false,
  },
  {
    id: '2',
    name: 'Inspect plants for pests or helpers',
    category: 'plant-care',
    frequency: 'daily',
    completed: false,
    type: 'default',
    hidden: false,
    factoryHidden: false,
  },
  {
    id: '3',
    name: 'Prune and remove spent blooms',
    category: 'plant-care',
    frequency: 'weekly',
    completed: false,
    type: 'default',
    hidden: false,
    factoryHidden: false,
  },
  {
    id: '4',
    name: 'Check leaves for signs of disease',
    category: 'plant-care',
    frequency: 'weekly',
    completed: false,
    type: 'default',
    hidden: false,
    factoryHidden: false,
  },
  {
    id: '5',
    name: 'Hand-pollinate blossoms if needed',
    category: 'growth-support',
    frequency: 'weekly',
    completed: false,
    type: 'default',
    hidden: true,
    factoryHidden: true,
  },
  {
    id: '6',
    name: 'Secure vines or stems to trellis',
    category: 'growth-support',
    frequency: 'weekly',
    completed: false,
    type: 'default',
    hidden: true,
    factoryHidden: true,
  },
  {
    id: '7',
    name: 'Thin overcrowded seedlings',
    category: 'growth-support',
    frequency: 'monthly',
    completed: false,
    type: 'default',
    hidden: true,
    factoryHidden: true,
  },
  {
    id: '8',
    name: 'Harvest ripe produce',
    category: 'harvest',
    frequency: 'weekly',
    completed: false,
    type: 'default',
    hidden: false,
    factoryHidden: false,
  },
  {
    id: '9',
    name: 'Check compost moisture and progress',
    category: 'soil-compost',
    frequency: 'weekly',
    completed: false,
    type: 'default',
    hidden: false,
    factoryHidden: false,
  },
];
