import { ViewKey } from '../../../mocks/mockdata';
import { HarvestSummary } from './harvest/HarvestSummary';
import { SoilSummary } from './soil/SoilSummary';

interface ReflectionSectionProps {
  onSelect: (view: ViewKey) => void;
}

export const ReflectSection: React.FC<ReflectionSectionProps> = ({
  onSelect,
}) => {
  return (
    <section aria-labelledby='reflect-heading' className='mt-12'>
      <h2
        id='plan-heading'
        className='text-2xl md:text-3xl font-bold text-[#2a452c] mb-6'
      >
        Reflect on Your Progress
      </h2>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <HarvestSummary onSelect={onSelect} />
        <SoilSummary onSelect={onSelect} />

        <div className='bg-white rounded-lg shadow p-4 flex flex-col justify-between'>
          <h3 className='text-lg font-semibold text-[#2a452c] mb-2'>
            Photo Uploads
          </h3>
          <p className='text-sm text-gray-600'>
            Upload garden photos to document your progress — not ready yet!
          </p>
        </div>

        <div className='bg-white rounded-lg shadow p-4 flex flex-col justify-between'>
          <h3 className='text-lg font-semibold text-[#2a452c] mb-2'>
            Journal View
          </h3>
          <p className='text-sm text-gray-600'>
            Write daily or seasonal reflections — stay tuned!
          </p>
        </div>
      </div>
    </section>
  );
};
export default ReflectSection;
