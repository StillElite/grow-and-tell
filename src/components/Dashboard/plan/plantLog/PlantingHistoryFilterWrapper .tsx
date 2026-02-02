import { usePlantingHistoryContext } from '../../../../context/PlantingHistoryContext';
import { FilterFlyout } from '../../../shared/Filters/FilterFlyout';
import { useState } from 'react';
import { FilterBar } from '../../../shared/Filters/FilterBar';
import { DateRangeKey } from '../../../../context/PlantingHistoryContext';
import { getAccentColor } from '../../../../utils/getAccentColor';
import {
  FilterController,
  FilterGroupConfig,
} from '../../../shared/Filters/filterConfig';
import { ViewKey } from '../../../../types/types';

const PlantingHistoryFilterWrapper = () => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
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
    clearFilters,
    hasActiveFilters,
  } = usePlantingHistoryContext();

  const { bgAccent, checkedBgAccent, altCheckedBgAccent, borderAccent } =
    getAccentColor(ViewKey.PlantLog);

  const groups: FilterGroupConfig[] = [
    { key: 'crops', label: 'Crops', type: 'multi', options: cropOptions },
    { key: 'beds', label: 'Beds', type: 'multi', options: bedOptions },
    { key: 'date', label: 'Date', type: 'single', options: dateOptions },
  ];

  // Generic controller that maps to your context setters
  const controller: FilterController = {
    values: {
      crops: cropFilter,
      beds: bedFilter,
      date: dateFilter, // string | null here (history wrapper knows it's DateRangeKey | null)
    },
    setValue: (key, newValue) => {
      if (key === 'crops') {
        const newCropIds = Array.isArray(newValue) ? newValue : [];
        setCropFilter(newCropIds);
        return;
      }

      if (key === 'beds') {
        const newBedIds = Array.isArray(newValue) ? newValue : [];
        setBedFilter(newBedIds);
        return;
      }

      if (key === 'date') {
        // Treat empty string/undefined as “no date”
        const newDateRange =
          typeof newValue === 'string' && newValue.trim().length > 0
            ? (newValue as DateRangeKey)
            : null;

        setDateFilter(newDateRange);
        return;
      }
    },
    clearAll: clearFilters,
    hasActive: hasActiveFilters,
  };

  const handleCloseFilters = () => setIsFlyoutOpen(false);
  const handleOpenFilters = () => setIsFlyoutOpen(true);

  return (
    <>
      <FilterBar
        groups={groups}
        controller={controller}
        bgAccent={bgAccent}
        onOpenFilters={handleOpenFilters}
        altCheckedBgAccent={altCheckedBgAccent}
      />
      <FilterFlyout
        isOpen={isFlyoutOpen}
        onClose={handleCloseFilters}
        groups={groups}
        controller={controller}
        bgAccent={bgAccent}
        checkedBgAccent={checkedBgAccent}
        borderAccent={borderAccent}
      />
    </>
  );
};

export default PlantingHistoryFilterWrapper;
