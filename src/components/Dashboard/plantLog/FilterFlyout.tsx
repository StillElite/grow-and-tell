import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FilterFlyoutGroup } from './FilterFlyoutGroup';
import { toggleArrayValue } from '../../../utils/toggleArrayValue';
import { getAccentColor } from '../../../utils/getAccentColor';
import { ViewKey } from '../../../mocks/mockdata';
import { clsx } from 'clsx';

interface FilterFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterFlyout: React.FC<FilterFlyoutProps> = ({
  isOpen,
  onClose,
}) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animateIn, setAnimateIn] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const [selectedCrop, setSelectedCrop] = useState<string[]>([]);
  const [selectedBed, setSelectedBed] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string[]>([]);

  const { bgAccent } = getAccentColor(ViewKey.PlantLog);

  const getFilterPanelClasses = (animateIn: boolean) => `
  bg-gray-50 w-80 max-w-full h-full shadow-lg p-6 relative
  transform transition-transform duration-300 ease-in-out
  ${animateIn ? 'translate-x-0' : 'translate-x-full'}  
`;

  // When opening, render first, then animate in
  useLayoutEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => setAnimateIn(true));
    }
  }, [isOpen]);

  // When closing, animate out, then unmount after animation
  useEffect(() => {
    if (!isOpen && shouldRender) {
      setAnimateIn(false);
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  // Handler for clicking outside the panel
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex justify-end'
      onClick={handleBackdropClick}
      role='presentation'
    >
      <div ref={panelRef} className={getFilterPanelClasses(animateIn)}>
        <button
          onClick={onClose}
          aria-label='Close filters'
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className='text-xl font-semibold mb-6'>All Filters</h2>
        <FilterFlyoutGroup
          label='Crop'
          options={['Tomato', 'Pepper', 'Carrot']}
          selected={selectedCrop}
          onChange={(value) =>
            setSelectedCrop((prev) => toggleArrayValue(prev, value))
          }
        />
        <FilterFlyoutGroup
          label='Bed'
          options={['Bed 1', 'Bed 2', 'Bed 3']}
          selected={selectedBed}
          onChange={(value) =>
            setSelectedBed((prev) => toggleArrayValue(prev, value))
          }
        />
        <FilterFlyoutGroup
          label='Date'
          options={['Spring', 'Summer', 'Fall']}
          selected={selectedDate}
          type='radio'
          name='date'
          onChange={(value) => setSelectedDate([value])}
        />

        <button
          onClick={() => {
            setSelectedCrop([]);
            setSelectedBed([]);
            setSelectedDate([]);
          }}
          className={clsx(
            'mt-6 w-full py-2 px-4 text-sm font-semibold text-white rounded-md',
            bgAccent
          )}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};
