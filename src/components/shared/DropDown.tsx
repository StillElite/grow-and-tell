import { useRef, useId } from 'react';
import { useClickOutsideClose } from '../../utils/useClickOutsideClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';

interface DropdownProps {
  label: string;
  value: string | null;
  options: string[];
  bgAccent: string;
  onChange: (value: string | null) => void;
  open: boolean;
  onButtonClick: () => void;
  onClose: () => void;
}

const BUTTON_BASE =
  'w-full rounded-full px-4 py-2 text-sm border transition-colors flex justify-between items-center whitespace-nowrap';
const BUTTON_INACTIVE = 'bg-white border-gray-300 text-gray-700';

const getOptionClasses = (selected: boolean, accent: string) => {
  const base = 'cursor-pointer select-none px-4 py-2 text-sm';
  return selected
    ? `${base} ${accent} text-white font-semibold`
    : `${base} bg-white text-gray-700 hover:bg-gray-200 hover:text-gray-900`;
};

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  bgAccent,
  onChange,
  open,
  onButtonClick,
  onClose,
}: DropdownProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  useClickOutsideClose(rootRef, open, onClose);

  // a11y ids to link button <-> listbox
  const baseId = useId();
  const buttonId = `${baseId}-btn`;
  const listboxId = `${baseId}-listbox`;

  const isActive = value !== null;
  const displayLabel = value ?? label;

  const buttonClass = `${BUTTON_BASE} ${
    isActive ? `${bgAccent} border-transparent text-white` : BUTTON_INACTIVE
  }`;

  const handleOptionClick = (option: string) => {
    onChange(option);
    onClose();
  };

  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    option: string | null,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      if (option === null) {
        onChange(null);
      } else {
        onChange(option);
      }

      onClose();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div ref={rootRef} className='relative w-36'>
      <button
        id={buttonId}
        type='button'
        className={buttonClass}
        onClick={onButtonClick}
        aria-haspopup='listbox'
        aria-expanded={open}
        aria-controls={listboxId}
      >
        {displayLabel}
        <FontAwesomeIcon
          icon={faChevronDown}
          className='ml-2 text-[12px]'
          aria-hidden='true'
        />
      </button>

      {open && (
        <div
          id={listboxId}
          role='listbox'
          aria-labelledby={buttonId}
          className='absolute z-[99] mt-1 max-h-48 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-md py-1'
        >
          {/* All / clear */}
          <div
            role='option'
            aria-selected={value === null}
            tabIndex={0}
            className={getOptionClasses(value === null, bgAccent)}
            onClick={() => {
              onChange(null);
              onClose();
            }}
            onKeyDown={(e) => handleOptionKeyDown(e, null)}
          >
            <div className='flex justify-between items-center'>
              <span>{label}</span>
              {value === null && (
                <FontAwesomeIcon
                  icon={faCheck}
                  className='ml-2'
                  aria-hidden='true'
                />
              )}
            </div>
          </div>

          {/* Concrete ranges */}
          {options.map((option) => {
            const selected = value === option;
            return (
              <div
                key={option}
                role='option'
                aria-selected={selected}
                tabIndex={0}
                className={getOptionClasses(selected, bgAccent)}
                onClick={() => handleOptionClick(option)}
                onKeyDown={(e) => handleOptionKeyDown(e, option)}
              >
                <div className='flex justify-between items-center'>
                  <span>{option}</span>
                  {selected && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className='ml-2'
                      aria-hidden='true'
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
