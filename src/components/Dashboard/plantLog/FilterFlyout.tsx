import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FilterFlyoutGroup } from './FilterFlyoutGroup';
import { toggleArrayValue } from '../../../utils/toggleArrayValue';

interface FilterFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
  cropOptions: string[];
  bedOptions: string[];
  dateOptions: string[];
}

export const FilterFlyout: React.FC<FilterFlyoutProps> = ({
  isOpen,
  onClose,
  cropOptions,
  bedOptions,
  dateOptions,
}) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animateIn, setAnimateIn] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const [selectedCrop, setSelectedCrop] = useState<string[]>([]);
  const [selectedBed, setSelectedBed] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string[]>([]);

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
          label='Crops'
          options={cropOptions}
          selected={selectedCrop}
          onChange={(value) =>
            setSelectedCrop((prev) => toggleArrayValue(prev, value))
          }
        />
        <FilterFlyoutGroup
          label='Beds'
          options={bedOptions}
          selected={selectedBed}
          onChange={(value) =>
            setSelectedBed((prev) => toggleArrayValue(prev, value))
          }
        />
        <FilterFlyoutGroup
          label='Date'
          options={dateOptions}
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
          className='mt-6 w-full bg-lime-600 text-white py-2 rounded'
        >
          Clear All
        </button>
      </div>
    </div>
  );
};
