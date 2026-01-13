import React from 'react';
import { HarvestCategories } from './HarvestCategories';
import { HarvestRecentEntries } from './HarvestRecentEntries';
import { ViewKey } from '../../../../mocks/mockdata';
import { useHarvestContext } from '../../../../context/HarvestContext';

interface HarvestSummaryProps {
  onSelect: (view: ViewKey) => void;
}

export const HarvestSummary: React.FC<HarvestSummaryProps> = ({ onSelect }) => {
  const { harvests } = useHarvestContext();

  return (
    <section className='rounded-lg bg-white shadow p-6'>
      <h2 className='text-lg font-semibold text-neutral-900'>
        Harvest Summary
      </h2>

      {/* Grid */}
      <div className='mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
        <HarvestCategories harvests={harvests} />
        <HarvestRecentEntries harvests={harvests} />
      </div>

      {/* Bottom action */}
      <div className='mt-6 pt-4 border-t border-neutral-200'>
        <button
          type='button'
          className='w-full bg-[#244225] text-white text-sm px-4 py-2 rounded hover:bg-[#356a3c] transition'
          onClick={() => onSelect(ViewKey.Harvest)}
        >
          View harvest log
        </button>
      </div>
    </section>
  );
};
