export type GroupType = 'single' | 'multi';

export interface FilterGroupConfig {
  key: string;
  label: string;
  type: GroupType;
  options: string[];
  emptyLabel?: string;
}

export type GroupValue = string[] | string | null;

export interface FilterController {
  values: Record<string, GroupValue>;
  setValue: (key: string, newValue: GroupValue) => void;
  clearAll: () => void;
  hasActive: boolean;
  activeCount?: number;
}
