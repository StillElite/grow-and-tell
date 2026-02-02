import { ViewKey } from '../../../types/types';
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
      </div>
    </section>
  );
};
export default ReflectSection;
