import React from 'react';
import { Harvest, HarvestCategory, HarvestUnit } from '../../../../types/types';
import { formatHarvestUnit } from '../../../../utils/formatHarvestUnit';

export interface HarvestCategoriesProps {
  harvests: Harvest[];
}

const HARVEST_CATEGORIES: HarvestCategory[] = [
  'Leafy greens',
  'Fruiting veggies',
  'Herbs',
  'Roots',
];

export type CategoryDisplay = {
  quantity: number;
  unit?: HarvestUnit;
};

export const HarvestCategories: React.FC<HarvestCategoriesProps> = ({
  harvests,
}) => {
  const categoryTotals = harvests.reduce(
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

  const categoryDisplay: Record<HarvestCategory, CategoryDisplay> = {
    'Leafy greens': { quantity: 0 },
    'Fruiting veggies': { quantity: 0 },
    Herbs: { quantity: 0 },
    Roots: { quantity: 0 },
  };

  HARVEST_CATEGORIES.forEach((category) => {
    const total = categoryTotals[category];

    if (!total || total.quantity === 0) return;

    categoryDisplay[category] = {
      quantity: total.quantity,
      unit: total.unit,
    };
  });

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
