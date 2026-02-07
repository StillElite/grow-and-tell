import React from 'react';
import type {
  Harvest,
  HarvestCategory,
  HarvestUnit,
} from '../../../../types/types';
import { formatHarvestUnit } from '../../../../utils/formatHarvestUnit';
import { HARVEST_CATEGORIES } from '../../../../constants/harvest';

export interface HarvestCategoriesProps {
  harvests: Harvest[];
}

type CategoryDisplay = {
  quantity: number;
  unit?: HarvestUnit;
};

const buildEmptyCategoryDisplay = (): Record<
  HarvestCategory,
  CategoryDisplay
> => {
  return HARVEST_CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = { quantity: 0 };
      return acc;
    },
    {} as Record<HarvestCategory, CategoryDisplay>,
  );
};

const buildCategoryTotals = (
  harvests: Harvest[],
): Record<HarvestCategory, { quantity: number; unit: HarvestUnit }> => {
  return harvests.reduce(
    (acc, harvest) => {
      const category = harvest.category;

      if (!acc[category]) {
        acc[category] = { quantity: 0, unit: harvest.unit };
      }

      acc[category].quantity += harvest.quantity;
      return acc;
    },
    {} as Record<HarvestCategory, { quantity: number; unit: HarvestUnit }>,
  );
};

const buildCategoryDisplay = (
  harvests: Harvest[],
): Record<HarvestCategory, CategoryDisplay> => {
  const categoryTotals = buildCategoryTotals(harvests);
  const categoryDisplay = buildEmptyCategoryDisplay();

  HARVEST_CATEGORIES.forEach((category) => {
    const total = categoryTotals[category];

    if (!total || total.quantity === 0) return;

    categoryDisplay[category] = {
      quantity: total.quantity,
      unit: total.unit,
    };
  });

  return categoryDisplay;
};

export const HarvestCategories: React.FC<HarvestCategoriesProps> = ({
  harvests,
}) => {
  const categoryDisplay = buildCategoryDisplay(harvests);

  return (
    <div className='rounded-lg border border-neutral-200 p-4'>
      <h3 className='text-sm font-bold text-[#c28b3c]'>Categories</h3>

      <ul className='mt-3 space-y-2'>
        {HARVEST_CATEGORIES.map((category) => {
          const display = categoryDisplay[category];

          return (
            <li key={category} className='flex justify-between text-sm'>
              <span>{category}</span>

              <span className='text-neutral-600'>
                <strong className='text-neutral-800'>{display.quantity}</strong>

                {display.unit ? (
                  <span className='text-neutral-600'>
                    {' '}
                    ({formatHarvestUnit(display.quantity, display.unit)})
                  </span>
                ) : null}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
