import { AllFilterButton } from './AllFiltersButton';
import { getAccentColor } from '../../../utils/getAccentColor';
import { ViewKey } from '../../../mocks/mockdata';
import { usePlantingHistoryContext } from '../../../context/PlantingHistoryContext';
import { MultiSelect } from '../../shared/MultiSelect';
import { useState } from 'react';
import { Dropdown } from '../../shared/DropDown';

interface FilterBarProps {
  onOpenFilters?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onOpenFilters }) => {
  const {
    cropFilter,
    setCropFilter,
    bedFilter,
    setBedFilter,
    dateFilter,
    setDateFilter,
    cropOptions,
    bedOptions,
    dateOptions,
  } = usePlantingHistoryContext();

  const { bgAccent } = getAccentColor(ViewKey.PlantLog);

  type PanelKey = 'crops' | 'beds' | 'date';

  const [openKey, setOpenKey] = useState<PanelKey | null>(null);

  const closeAll = () => setOpenKey(null);

  // one toggler for all buttons
  const toggle = (key: PanelKey) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className='flex flex-wrap items-start gap-4 mb-6'>
      <div className='hidden sm:flex gap-4'>
        <MultiSelect
          label='All Crops'
          options={cropOptions.map((opt) => ({ id: opt, label: opt }))}
          selectedIds={cropFilter}
          onChange={setCropFilter}
          onClose={closeAll}
          bgAccent={bgAccent}
          open={openKey === 'crops'}
          onButtonClick={() => toggle('crops')}
        />
        <MultiSelect
          label='All Beds'
          options={bedOptions.map((opt) => ({ id: opt, label: opt }))}
          selectedIds={bedFilter}
          onChange={setBedFilter}
          onClose={closeAll}
          bgAccent={bgAccent}
          open={openKey === 'beds'}
          onButtonClick={() => toggle('beds')}
        />
        <Dropdown
          label='All Dates'
          value={dateFilter}
          options={dateOptions}
          bgAccent={bgAccent}
          onChange={setDateFilter}
          open={openKey === 'date'}
          onButtonClick={() => toggle('date')}
          onClose={closeAll}
        />
      </div>
      <AllFilterButton onClick={onOpenFilters} />
    </div>
  );
};
