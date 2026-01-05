import React from 'react';

export const HarvestCategories: React.FC = () => {
  return (
    <div className='rounded-lg border border-neutral-200 p-4'>
      <h3 className='text-sm font-bold text-[#c28b3c]'>Categories</h3>

      <ul className='mt-3 space-y-2'>
        <li className='flex justify-between text-sm'>
          <span>Leafy greens</span>
          <span className='text-neutral-600'>
            <strong className='text-neutral-800'>3</strong> bunches
          </span>
        </li>

        <li className='flex justify-between text-sm'>
          <span>Fruiting veg</span>
          <span className='text-neutral-600'>
            <strong className='text-neutral-800'>12.5</strong> lbs
          </span>
        </li>

        <li className='flex justify-between text-sm'>
          <span>Herbs</span>
          <span className='text-neutral-600'>
            <strong className='text-neutral-800'>18</strong> count
          </span>
        </li>

        <li className='flex justify-between text-sm'>
          <span>Roots</span>
          <span className='text-neutral-600'>
            <strong className='text-neutral-800'>6</strong> count
          </span>
        </li>
      </ul>
    </div>
  );
};
