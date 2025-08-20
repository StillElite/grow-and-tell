import { useState } from 'react';
import SectionHeader from '../../shared/SectionHeader';
import { FilterBar } from './FilterBar';
import { PlantingList } from './PlantingList';
import { FilterFlyout } from './FilterFlyout';
import { ViewKey } from '../../../mocks/mockdata';
import PageHeader from '../../shared/PageHeader';
import { usePlantingHistoryContext } from '../../../context/PlantingHistoryContext';

export interface PlantingSectionProps {
  onNavigate: (view: ViewKey) => void;
  onOpenMenu: () => void;
}

const PlantingSection: React.FC<PlantingSectionProps> = ({
  onNavigate,
  onOpenMenu,
}) => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  const { filteredPlantings, cropOptions, bedOptions, dateOptions } =
    usePlantingHistoryContext();

  const handleLogout = () => {
    window.location.href = '/';
  };

  const breadcrumbItems = [
    { label: 'Dashboard', onClick: () => onNavigate?.(ViewKey.Dashboard) },
    { label: 'Plant Log' },
  ];

  const handleCloseFilters = () => setIsFlyoutOpen(false);
  const handleOpenFilters = () => {
    setIsFlyoutOpen(true);
  };

  return (
    <>
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        onLogout={handleLogout}
        onOpenMenu={onOpenMenu}
      />
      <SectionHeader
        title='Plant Log'
        description='Review past plantings to learn what worked where.'
        imageSrc='/images/planting.png'
      />

      <FilterBar onOpenFilters={handleOpenFilters} />

      <FilterFlyout
        isOpen={isFlyoutOpen}
        onClose={handleCloseFilters}
        cropOptions={cropOptions}
        bedOptions={bedOptions}
        dateOptions={dateOptions}
      />
      <PlantingList plantingHistory={filteredPlantings} />
    </>
  );
};

export default PlantingSection;
