import Image from 'next/image';
import { ViewKey } from '../../../types/types';
import { getAccentColor } from '../../../utils/getAccentColor';
import { useBedContext } from '../../../context/BedContext';
import { usePlantingHistoryContext } from '../../../context/PlantingHistoryContext';
import { useCompostContext } from '../../../context/CompostContext';
import { useTaskContext } from '../../../context/TaskContext';
import { getPlanningFeatureCards } from '../../../utils/getPlanningFeatureCards';
import { useMemo } from 'react';

interface PlanSectionProps {
  onSelect: (view: ViewKey) => void;
}

const PlanSection: React.FC<PlanSectionProps> = ({ onSelect }) => {
  const { beds } = useBedContext();
  const { plantingRecords } = usePlantingHistoryContext();
  const { compostBins } = useCompostContext();
  const { tasks } = useTaskContext();

  const visibleTasks = useMemo(
    () => tasks.filter((t) => !t.hidden), // hide hidden ones
    [tasks],
  );

  const planningFeatureCards = getPlanningFeatureCards(
    beds,
    plantingRecords.length,
    compostBins.length,
    visibleTasks,
  );

  return (
    <section aria-labelledby='plan-heading'>
      <h2
        id='plan-heading'
        className='text-2xl md:text-3xl font-bold text-[#2a452c] mb-6'
      >
        Grow Your Garden
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {planningFeatureCards.map((feature) => {
          const { bgAccent } = getAccentColor(feature.viewKey);

          return (
            <div
              key={feature.title}
              role='button'
              tabIndex={feature.comingSoon ? -1 : 0}
              aria-disabled={feature.comingSoon}
              onKeyDown={(e) => {
                if (
                  !feature.comingSoon &&
                  (e.key === 'Enter' || e.key === ' ')
                ) {
                  onSelect(feature.viewKey);
                }
              }}
              onClick={() => {
                if (!feature.comingSoon && feature.viewKey) {
                  onSelect(feature.viewKey);
                }
              }}
              className='cursor-pointer bg-white rounded-lg shadow overflow-hidden transition hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#244225] focus-visible:ring-offset-2'
            >
              <div className={`h-1 ${bgAccent}`} />
              <div className='pl-2 pr-2 py-4 flex items-center gap-2'>
                <Image
                  src={feature.image}
                  alt=''
                  width={48}
                  height={48}
                  role='presentation'
                  aria-hidden='true'
                  priority
                  fetchPriority='high'
                />
                <div>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {feature.title}
                  </h3>
                  <p className='text-sm text-gray-600'>{feature.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PlanSection;
