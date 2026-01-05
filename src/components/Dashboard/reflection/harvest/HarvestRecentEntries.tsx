import React from 'react';

export const HarvestRecentEntries: React.FC = () => {
  return (
    <div className='rounded-lg border border-neutral-200 p-4 flex flex-col justify-between'>
      <h3 className='text-sm font-bold text-[#c28b3c]'>Recent entries</h3>

      <p className='mt-2 text-sm text-neutral-700'>
        <strong>12</strong> entries logged
      </p>

      <div className='mt-3'>
        <p className='text-xs font-medium text-neutral-500 mb-1.5'>
          Last 3 harvests:
        </p>
        <ul className='space-y-1'>
          <li className='text-sm text-neutral-600'>Tomatoes (2 lbs)</li>
          <li className='text-sm text-neutral-600'>Basil (1 bunch)</li>
          <li className='text-sm text-neutral-600'>Lettuce (3 heads)</li>
        </ul>
      </div>
    </div>
  );
};
