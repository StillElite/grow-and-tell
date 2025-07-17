import { useState } from 'react';
import { useBedContext } from '../../../context/BedContext';
import { capitalize } from '../../../utils/capitalize';
import SectionHeader from '../../shared/SectionHeader';
import { FilterBar } from './FilterBar';
import { PlantingList } from './PlantingList';
import { subtractDays } from '../../../utils/dateMatch';
import { FilterFlyout } from './FilterFlyout';
import { ViewKey } from '../../../mocks/mockdata';
import PageHeader from '../../shared/PageHeader';

export interface PlantingSectionProps {
  onNavigate: (view: ViewKey) => void;
  onOpenMenu: () => void;
}

const PlantingSection: React.FC<PlantingSectionProps> = ({
  onNavigate,
  onOpenMenu,
}) => {
  const { beds } = useBedContext();
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedBed, setSelectedBed] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);

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

  // flatmap converts all beds and their crops into a single flat array of crop objects
  const plantingHistory = beds.flatMap((bed) =>
    bed.crops.map((crop) => ({
      ...crop,
      bedName: bed.name,
    }))
  );

  const cropOptions = Array.from(
    new Set(plantingHistory.map((p) => capitalize(p.name)))
  ).sort();

  const bedOptions = Array.from(
    new Set(plantingHistory.map((p) => capitalize(p.bedName)))
  ).sort();

  const dateOptions = [
    'Past 7 Days',
    'Past 30 Days',
    'Past 3 Months',
    'Past 6 Months',
  ];

  const filteredPlantings = plantingHistory.filter((p) => {
    const matchesCrop = selectedCrop
      ? capitalize(p.name) === selectedCrop
      : true;
    const matchesBed = selectedBed
      ? capitalize(p.bedName) === selectedBed
      : true;
    const matchesDate = (() => {
      if (!selectedDate) return true;

      const plantedDate = new Date(p.datePlanted);

      switch (selectedDate) {
        case 'Past 7 Days':
          return plantedDate >= subtractDays(7);
        case 'Past 30 Days':
          return plantedDate >= subtractDays(30);
        case 'Past 3 Months':
          return plantedDate >= subtractDays(90);
        case 'Past 6 Months':
          return plantedDate >= subtractDays(180);
        default:
          return true;
      }
    })();
    return matchesCrop && matchesBed && matchesDate;
  });

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

      {/* Filter Dropdowns */}
      <FilterBar
        crop={selectedCrop}
        bed={selectedBed}
        date={selectedDate}
        cropOptions={cropOptions}
        bedOptions={bedOptions}
        dateOptions={dateOptions}
        onCropChange={setSelectedCrop}
        onBedChange={setSelectedBed}
        onDateChange={setSelectedDate}
        onOpenFilters={handleOpenFilters}
      />

      <FilterFlyout isOpen={isFlyoutOpen} onClose={handleCloseFilters} />
      <PlantingList plantingHistory={filteredPlantings} />
    </>
  );
};

export default PlantingSection;
