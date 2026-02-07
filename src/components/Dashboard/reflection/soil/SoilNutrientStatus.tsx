import { SOIL_NUTRIENTS } from '../../../../constants/soil';
import { useSoilRecordContext } from '../../../../context/SoilRecordContext';
import { SoilNutrient, SoilRecord } from '../../../../types/types';
import { getLatestTest } from '../../../../utils/getLatestTest';
import { capitalize } from '../../../../utils/capitalize';
import { isNutrientDeficient } from '../../../../utils/nutrientDeficiency';

export interface SoilNutrientStatusProps {
  soilRecords: SoilRecord[];
}

const buildNutrientCounts = (
  soilRecords: SoilRecord[],
): Record<SoilNutrient, number> => {
  const counts = SOIL_NUTRIENTS.reduce(
    (acc, nutrient) => {
      acc[nutrient] = 0;
      return acc;
    },
    {} as Record<SoilNutrient, number>,
  );

  soilRecords.forEach((record) => {
    const latestTest = getLatestTest(record.tests);
    if (!latestTest) return;

    SOIL_NUTRIENTS.forEach((nutrient) => {
      const value = latestTest[nutrient];

      if (isNutrientDeficient(value)) {
        counts[nutrient] = counts[nutrient] + 1;
      }
    });
  });

  return counts;
};

export const SoilNutrientStatus: React.FC = () => {
  const { soilRecords } = useSoilRecordContext();

  const nutrientCounts = buildNutrientCounts(soilRecords);

  return (
    <div className='rounded-lg border border-neutral-200 p-4'>
      <h3 className='text-sm font-bold text-[#c28b3c]'>Nutrients Needed</h3>

      <ul className='mt-3 space-y-2'>
        {SOIL_NUTRIENTS.map((nutrient) => (
          <li key={nutrient} className='flex justify-between text-sm'>
            <span>{capitalize(nutrient)}</span>

            <span className='text-neutral-600'>
              <strong className='text-neutral-800'>
                {nutrientCounts[nutrient]}
              </strong>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
