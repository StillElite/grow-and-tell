import { ViewKey } from '../../../../types/types';

export interface SoilSummaryProps {
  onSelect: (view: ViewKey) => void;
}

export const SoilSummary: React.FC<SoilSummaryProps> = ({ onSelect }) => {
  return (
    <section className='rounded-lg bg-white shadow p-6'>
      <h3 className='text-lg font-semibold text-neutral-900'>Soil Summary</h3>

      {/* Split summary */}
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <div className='rounded-md bg-neutral-50 p-3'>
          <h3 className='text-sm font-bold text-neutral-500 uppercase tracking-wide'>
            Tests
          </h3>

          {/* Metrics list */}
          <ul className='mt-3 space-y-2 text-sm text-neutral-800'>
            <li className='flex justify-between'>
              <span>Beds tested</span>
              <span>6 / 7</span>
            </li>

            <li className='flex justify-between'>
              <span>Beds needing nutrients</span>
              <span>3 / 7</span>
            </li>
          </ul>
        </div>

        {/* Nutrients */}
        <div className='rounded-md bg-neutral-50 p-3'>
          <h3 className='text-sm font-medium text-neutral-500 uppercase tracking-wide'>
            Nutrients Needed
          </h3>

          {/* Status block */}

          <ul className='mt-3 space-y-2 text-sm text-neutral-800'>
            <li className='flex justify-between'>
              <span>Nitrogen (N)</span>
              <span>2</span>
            </li>
            <li className='flex justify-between'>
              <span>Phosphorus (P)</span>
              <span>1</span>
            </li>
            <li className='flex justify-between'>
              <span>Potassium (K)</span>
              <span>0</span>
            </li>
            <li className='flex justify-between'>
              <span>pH</span>
              <span>3</span>
            </li>
          </ul>
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
