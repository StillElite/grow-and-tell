import { CompostStatus, CompostType } from '../types/types';
import type { Option } from '../components/shared/forms/SelectFormField';

export const COMPOST_TYPE_OPTIONS: Option<CompostType>[] = [
  { value: 'Worm', label: 'Worm' },
  { value: 'Leaf', label: 'Leaf' },
  { value: 'Hot', label: 'Hot' },
  { value: 'Cold', label: 'Cold' },
];

export const COMPOST_STATUS_OPTIONS: Option<CompostStatus>[] = [
  { value: 'Active', label: 'Active' },
  { value: 'Ready', label: 'Ready' },
  { value: 'Emptied', label: 'Emptied' },
];
