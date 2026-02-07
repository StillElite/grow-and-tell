import { SoilRecord, SoilTestStatusCounts } from '../types/types';
import { getLatestTest } from './getLatestTest';
import { hasNutrientDeficiency } from './nutrientDeficiency';

export const getSoilTestStatusCounts = (
  soilRecords: SoilRecord[],
): SoilTestStatusCounts => {
  let testedCount = 0;
  let needsNutrientsCount = 0;

  soilRecords.forEach((record) => {
    const latest = getLatestTest(record.tests);

    if (!latest) return;

    testedCount = testedCount + 1;

    if (hasNutrientDeficiency(latest)) {
      needsNutrientsCount = needsNutrientsCount + 1;
    }
  });

  return { testedCount, needsNutrientsCount };
};
