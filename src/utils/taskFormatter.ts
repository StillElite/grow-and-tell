import { TaskCategory, TaskFrequency } from '../types/types';

export const getCategoryColor = (category: TaskCategory): string => {
  const colors = {
    'plant-care': 'bg-emerald-500',
    'growth-support': 'bg-amber-500',
    'soil-compost': 'bg-lime-600',
    harvest: 'bg-yellow-500',
    misc: 'bg-gray-500',
  };
  return colors[category];
};

export const getCategoryLabel = (category: TaskCategory): string => {
  const labels = {
    'plant-care': 'Plant Care',
    'growth-support': 'Growth Support',
    'soil-compost': 'Soil/Compost',
    harvest: 'Harvest',
    misc: 'Miscellaneous',
  };
  return labels[category];
};

export const getFrequencyLabel = (frequency: TaskFrequency): string => {
  const labels = {
    daily: 'daily',
    weekly: 'weekly',
    monthly: 'monthly',
  };
  return labels[frequency];
};
