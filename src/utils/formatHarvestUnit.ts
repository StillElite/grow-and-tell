import { HarvestUnit } from '../types/types';

const SINGULAR_UNITS: Record<HarvestUnit, string> = {
  bunches: 'bunch',
  lbs: 'lb',
  count: 'count',
};

export const formatHarvestUnit = (
  quantity: number,
  unit: HarvestUnit,
): string => {
  return quantity === 1 ? SINGULAR_UNITS[unit] : unit;
};
