import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FilterFlyoutGroup } from './FilterFlyoutGroup';
import { toggleArrayValue } from '../../../utils/toggleArrayValue';
import {
  FilterController,
  FilterGroupConfig,
  GroupValue,
} from './filterConfig';

interface GenericFilterFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
  groups: FilterGroupConfig[];
  controller: FilterController;
  bgAccent: string;
  checkedBgAccent?: string;
  borderAccent?: string;
}

export const FilterFlyout: React.FC<GenericFilterFlyoutProps> = ({
  isOpen,
  onClose,
  groups,
  controller,
  bgAccent,
  checkedBgAccent,
  borderAccent,
}) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animateIn, setAnimateIn] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Local staged values (copied from controller on open)
  const [localValues, setLocalValues] = useState<Record<string, GroupValue>>(
    controller.values,
  );

  const getPanelClasses = (entering: boolean) => `
    bg-gray-50 w-84 max-w-full h-full shadow-lg p-6 relative
    transform transition-transform duration-300 ease-in-out
    ${entering ? 'translate-x-0' : 'translate-x-full'}
    flex flex-col
  `;

  // Open -> render + animate; reset staged values from controller
  useLayoutEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => setAnimateIn(true));
      setLocalValues(controller.values);
    }
  }, [isOpen, controller.values]);

  // Close animation
  useEffect(() => {
    if (!isOpen && shouldRender) {
      setAnimateIn(false);
      const t = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen, shouldRender]);

  // Backdrop click closes (cancels staged edits)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleClearAll = () => {
    const cleared: Record<string, GroupValue> = {};
    for (const group of groups) {
      cleared[group.key] = group.type === 'multi' ? [] : null;
    }
    setLocalValues(cleared);
  };

  const handleApply = () => {
    // commit staged values via controller, then close
    for (const group of groups) {
      controller.setValue(
        group.key,
        localValues[group.key] ?? (group.type === 'multi' ? [] : null),
      );
    }
    onClose();
  };

  if (!shouldRender) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex justify-end'
      onClick={handleBackdropClick}
      role='presentation'
    >
      <div
        ref={panelRef}
        className={getPanelClasses(animateIn)}
        role='dialog'
        aria-modal='true'
        aria-labelledby='dialog-title'
      >
        <button
          type='button'
          onClick={onClose}
          aria-label='Close filters'
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2 id='dialog-title' className='text-xl font-semibold mb-6'>
          All Filters
        </h2>

        <div className='flex-1 overflow-y-auto pr-2'>
          {groups.map((group) => {
            const currentValue = localValues[group.key];

            // normalize staged selection into the shape FilterFlyoutGroup expects
            const selectedForGroup =
              group.type === 'multi'
                ? ((currentValue as string[]) ?? [])
                : currentValue
                  ? [currentValue as string]
                  : [];

            return (
              <FilterFlyoutGroup
                key={group.key}
                label={group.label}
                options={group.options}
                selected={selectedForGroup}
                type={group.type === 'single' ? 'radio' : undefined}
                onChange={(optionId: string) => {
                  setLocalValues((prev) => {
                    const prevValue = prev[group.key];

                    if (group.type === 'multi') {
                      const nextIds = toggleArrayValue(
                        (prevValue as string[]) ?? [],
                        optionId,
                      );
                      return { ...prev, [group.key]: nextIds };
                    } else {
                      // single: selecting an already-selected option keeps it selected
                      return { ...prev, [group.key]: optionId };
                    }
                  });
                }}
                bgAccent={bgAccent}
                checkedBgAccent={checkedBgAccent}
                borderAccent={borderAccent}
              />
            );
          })}
        </div>

        <div className='flex-shrink-0 flex justify-between mt-6 pt-4 border-t border-gray-200'>
          <button
            type='button'
            onClick={handleClearAll}
            className='text-gray-600 font-medium hover:underline'
          >
            Clear All
          </button>
          <button
            type='button'
            onClick={handleApply}
            className={`text-white bg-[#557C2D] px-6 py-2 rounded-lg font-medium shadow-md hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500`}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
