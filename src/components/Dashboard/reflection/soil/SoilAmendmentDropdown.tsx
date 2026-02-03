import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useClickOutsideClose } from '../../../../utils/useClickOutsideClose';
import { capitalize } from '../../../../utils/capitalize';
import { SoilAmendmentType } from '../../../../types/types';

export interface SoilAmendmentDropdownProps {
  options: SoilAmendmentType[];
  selectedAmendments: SoilAmendmentType[];
  onChange: (amendments: SoilAmendmentType[]) => void;
  open: boolean;
  onToggle: () => void;
}

export const SoilAmendmentDropdown: React.FC<SoilAmendmentDropdownProps> = ({
  options,
  selectedAmendments,
  onChange,
  open,
  onToggle,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useClickOutsideClose(menuRef, open, () => {
    if (open) onToggle();
  });

  const toggleAmendment = (amendment: SoilAmendmentType) => {
    onChange(
      selectedAmendments.includes(amendment)
        ? selectedAmendments.filter((a) => a !== amendment)
        : [...selectedAmendments, amendment],
    );

    // Refocus the option after toggle
    setTimeout(() => {
      optionRefs.current.get(amendment)?.focus();
    }, 0);
  };

  const isSelected = (amendment: SoilAmendmentType) =>
    selectedAmendments.includes(amendment);

  const getOptionClasses = (selected: boolean) => {
    return [
      'w-full cursor-pointer select-none px-4 py-2 text-left text-sm',
      'focus:outline-none',
      'focus-visible:relative focus-visible:z-10',
      'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0E2F1F]',
      selected
        ? 'bg-[#1E6635] text-white'
        : 'text-gray-700 hover:bg-[#F1F8EB] hover:text-gray-900',
    ].join(' ');
  };

  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    amendment: SoilAmendmentType,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleAmendment(amendment);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div ref={menuRef} className='relative'>
      <button
        type='button'
        aria-label='Add amendment'
        className='flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:border-[#244225] hover:text-[#244225]'
        onClick={onToggle}
        aria-haspopup='listbox'
        aria-expanded={open}
      >
        <span className='text-sm leading-none'>+</span>
      </button>

      {open && (
        <div
          role='listbox'
          aria-label='Soil amendments'
          aria-multiselectable='true'
          className='absolute left-0 top-full z-[99] mt-2 w-64 rounded-md border bg-white shadow-lg'
        >
          <div className='py-1 max-h-60 overflow-y-auto'>
            {options.map((amendment) => {
              const selected = isSelected(amendment);
              return (
                <div
                  key={amendment}
                  role='option'
                  aria-selected={selected}
                  tabIndex={0}
                  ref={(el) => {
                    if (el) {
                      optionRefs.current.set(amendment, el);
                    } else {
                      optionRefs.current.delete(amendment);
                    }
                  }}
                  className={getOptionClasses(selected)}
                  onClick={() => toggleAmendment(amendment)}
                  onKeyDown={(e) => handleOptionKeyDown(e, amendment)}
                >
                  <div className='flex items-center gap-2'>
                    <span className='relative w-5 h-5 flex-shrink-0'>
                      <input
                        type='checkbox'
                        checked={selected}
                        readOnly
                        tabIndex={-1}
                        aria-hidden='true'
                        className='peer appearance-none w-5 h-5 border border-gray-300 rounded checked:bg-[#154D29] checked:border-transparent'
                      />
                      <FontAwesomeIcon
                        icon={faCheck}
                        className='w-4 h-4 text-white absolute pointer-events-none opacity-0 scale-75 transition-all duration-200 ease-out peer-checked:opacity-100 peer-checked:scale-100 left-0 top-0 m-0.5'
                        aria-hidden='true'
                      />
                    </span>
                    <span className='truncate'>{capitalize(amendment)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedAmendments.length > 0 && (
            <div className='border-t px-2 py-2'>
              <div className='flex items-center justify-end'>
                <button
                  type='button'
                  className='text-xs underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-[#478143] focus:ring-offset-1'
                  onClick={() => {
                    onChange([]);
                    // Refocus first option after reset
                    setTimeout(() => {
                      const firstOption = optionRefs.current.get(options[0]);
                      firstOption?.focus();
                    }, 0);
                  }}
                  aria-label='Clear all selections'
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
