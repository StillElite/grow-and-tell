import { ViewKey } from '../../../../types/types';
import { SoilNutrientStatus } from './SoilNutrientStatus';

import { SoilTestStatus } from './SoilTestStatus';
export interface SoilSummaryProps {
  onSelect: (view: ViewKey) => void;
}

export const SoilSummary: React.FC<SoilSummaryProps> = ({ onSelect }) => {
  return (
    <section className='rounded-lg bg-white shadow p-6 flex flex-col justify-between'>
      <div>
        <h2 className='text-lg font-semibold text-neutral-900'>Soil Summary</h2>

        {/* Grid */}
        <div className='mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
          <SoilNutrientStatus />
          <SoilTestStatus />
        </div>
      </div>
      {/* Bottom action */}
      <div className='mt-6 pt-4 border-t border-neutral-200'>
        <button
          type='button'
          className='w-full bg-[#244225] text-white text-sm px-4 py-2 rounded hover:bg-[#356a3c] transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#244225]'
          onClick={() => onSelect(ViewKey.SoilRecord)}
        >
          View soil record
        </button>
      </div>
    </section>
  );
};
