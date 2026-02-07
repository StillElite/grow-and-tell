import { SoilTest } from '../types/types';

export const isNutrientDeficient = (value: number): boolean =>
  value === 0 || value === 1;

export const hasNutrientDeficiency = (test: SoilTest): boolean => {
  return (
    isNutrientDeficient(test.nitrogen) ||
    isNutrientDeficient(test.phosphorus) ||
    isNutrientDeficient(test.potassium)
  );
};
