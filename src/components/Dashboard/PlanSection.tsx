import Image from 'next/image';
import { Bed, PlanningFeatureCard, ViewKey } from '../../mocks/mockdata';
import { getAccentColor } from '../../utils/getAccentColor';
import { useBedContext } from '../../context/BedContext';
import { usePlantingHistoryContext } from '../../context/PlantingHistoryContext';

interface PlanSectionProps {
  onSelect: (view: ViewKey) => void;
}
const getPlanningFeatureCards = (
  beds: Bed[],
  plantingRecordCount: number
): PlanningFeatureCard[] => {
  return [
    {
      title: 'Beds',
      description: `${beds.length} Active`,
      image: '/images/garden-bed-icon.png',
      viewKey: ViewKey.Beds,
    },
    {
      title: 'Plant Log',
      description: `${plantingRecordCount} ${
        plantingRecordCount === 1 ? 'Entry' : 'Entries'
      }`,
      image: '/images/planting-icon.png',
      viewKey: ViewKey.PlantLog,
    },
    {
      title: 'Compost',
      description: '2 Bins',
      image: '/images/compost-icon3.png',
      viewKey: ViewKey.Compost,
    },
    {
      title: 'Tasks',
      description: 'Coming soon',
      image: '/images/task-icon.png',
      viewKey: ViewKey.Tasks,
      comingSoon: true,
    },
  ];
};

const PlanSection: React.FC<PlanSectionProps> = ({ onSelect }) => {
  const { beds } = useBedContext();
  const { plantingRecords } = usePlantingHistoryContext();

  const planningFeatureCards = getPlanningFeatureCards(
    beds,
    plantingRecords.length
  );

  return (
    <section aria-labelledby='plan-heading'>
      <h2
        id='plan-heading'
        className='text-2xl md:text-3xl font-bold text-[#2a452c] mb-6'
      >
        Plan Your Garden
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
              className={`cursor-pointer bg-white rounded-lg shadow overflow-hidden transition hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#79B040] ${
                feature.comingSoon ? 'opacity-60 pointer-events-none' : ''
              }`}
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
