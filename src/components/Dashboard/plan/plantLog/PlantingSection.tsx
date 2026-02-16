import SectionHeader from '../../../shared/SectionHeader';
import { PlantingList } from './PlantingList';
import { ViewKey } from '../../../../types/types';
import PageHeader from '../../../shared/PageHeader';
import { usePlantingHistoryContext } from '../../../../context/PlantingHistoryContext';
import PlantingHistoryFilterWrapper from './PlantingHistoryFilterWrapper';

export interface PlantingSectionProps {
  onNavigate: (view: ViewKey) => void;
  onOpenMenu: () => void;
}

const PlantingSection: React.FC<PlantingSectionProps> = ({
  onNavigate,
  onOpenMenu,
}) => {
  const { filteredPlantings } = usePlantingHistoryContext();

  const breadcrumbItems = [
    { label: 'Dashboard', onClick: () => onNavigate?.(ViewKey.Dashboard) },
    { label: 'Plant Log' },
  ];

  return (
    <>
      <PageHeader breadcrumbItems={breadcrumbItems} onOpenMenu={onOpenMenu} />
      <SectionHeader
        title='Plant Log'
        description='Review past plantings to learn what worked where.'
        imageSrc='/images/planting.png'
        imageAlt='sprout icon'
      />
      <PlantingHistoryFilterWrapper />
      <PlantingList plantingHistory={filteredPlantings} />
    </>
  );
};

export default PlantingSection;
