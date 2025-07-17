import { FilterDropdown } from './FilterDropdown';
import { AllFilterButton } from './AllFiltersButton';

interface FilterBarProps {
  crop: string;
  bed: string;
  date: string;
  cropOptions: string[];
  bedOptions: string[];
  dateOptions: string[];
  onCropChange: (value: string) => void;
  onBedChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onOpenFilters?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  crop,
  bed,
  date,
  cropOptions,
  bedOptions,
  dateOptions,
  onCropChange,
  onBedChange,
  onDateChange,
  onOpenFilters,
}) => {
  return (
    <div className='flex flex-wrap items-start gap-4 mb-6'>
      <div className='hidden sm:flex gap-4'>
        <FilterDropdown
          label='All Crops'
          value={crop}
          options={cropOptions}
          onChange={onCropChange}
        />
        <FilterDropdown
          label='All Beds'
          value={bed}
          options={bedOptions}
          onChange={onBedChange}
        />
        <FilterDropdown
          label='All Dates'
          value={date}
          options={dateOptions}
          onChange={onDateChange}
        />
      </div>
      <AllFilterButton onClick={onOpenFilters} />
    </div>
  );
};
