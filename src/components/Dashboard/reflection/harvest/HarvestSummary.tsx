import React from 'react';
import { HarvestCategories } from './HarvestCategories';
import { HarvestRecentEntries } from './HarvestRecentEntries';

export const HarvestSummary: React.FC = () => {
  return (
    <section className='rounded-lg bg-white shadow p-6'>
      <h2 className='text-lg font-semibold text-neutral-900'>
        Harvest Summary
      </h2>

      {/* Grid */}
      <div className='mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
        <HarvestCategories />
        <HarvestRecentEntries />
      </div>

      {/* Bottom action */}
      <div className='mt-6 pt-4 border-t border-neutral-200'>
        <button
          type='button'
          className='w-full bg-[#244225] text-white text-sm px-4 py-2 rounded hover:bg-[#356a3c] transition'
        >
          View harvest log
        </button>
      </div>
    </section>
  );
};
