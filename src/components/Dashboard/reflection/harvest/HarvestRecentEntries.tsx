import React from 'react';
import { formatHarvestUnit } from '../../../../utils/formatHarvestUnit';
import { Harvest } from '../../../../types/types';

export interface HarvestRecentEntriesProps {
  harvests: Harvest[];
}

export const HarvestRecentEntries: React.FC<HarvestRecentEntriesProps> = ({
  harvests,
}) => {
  const entriesLogged = `${harvests.length === 1 ? 'entry' : 'entries'}`;
  const lastThreeHarvests = harvests.slice(-3).reverse();

  return (
    <div className='rounded-lg border border-neutral-200 p-4 flex flex-col n'>
      <h3 className='text-sm font-bold text-[#986C2F]'>Recent entries</h3>

      <p className='mt-3 text-sm text-neutral-700'>
        <strong>{harvests.length}</strong> {entriesLogged} logged
      </p>

      <div className='mt-3'>
        <p className='text-xs font-medium text-neutral-500 mb-1.5'>
          Last 3 harvests:
        </p>

        <ul className='space-y-1'>
          {lastThreeHarvests.map((harvest) => (
            <li
              key={harvest.id}
              className='flex justify-between  text-sm text-neutral-600'
            >
              <span className='font-bold'>{harvest.name}</span>
              <span className='text-neutral-600'>
                <strong>{harvest.quantity} </strong>(
                {formatHarvestUnit(harvest.quantity, harvest.unit)})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
