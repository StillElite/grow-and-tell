import { useMemo, useRef, useId } from 'react';
import { useClickOutsideClose } from '../../utils/useClickOutsideClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';

interface MultiSelectOption {
  id: string;
  label: string;
}
interface MultiSelectProps {
  label: string;
  options: MultiSelectOption[];
  selectedIds: string[];
  onChange: (nextIds: string[]) => void;
  open: boolean;
  onButtonClick: () => void;
  bgAccent: string;
  altCheckedBgAccent: string;
  onClose: () => void;
}

const BUTTON_BASE =
  'w-full rounded-full px-4 py-2 text-sm border transition-colors flex justify-between items-center whitespace-nowrap';
const BUTTON_INACTIVE = 'bg-white border-gray-300 text-gray-700';
const ROW_BASE = 'cursor-pointer select-none px-4 py-2 text-sm';
const ROW_INACTIVE = 'hover:bg-[#F1F8EB] text-gray-700 hover:text-gray-900';

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selectedIds,
  onChange,
  open,
  onButtonClick,
  bgAccent,
  altCheckedBgAccent,
  onClose,
}: MultiSelectProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  useClickOutsideClose(rootRef, open, onClose);

  const ids = useId();
  const buttonId = `${ids}-btn`;
  const listboxId = `${ids}-listbox`;

  const isActive = selectedIds.length > 0;
  const buttonClass = `${BUTTON_BASE} ${
    isActive
      ? `${bgAccent} border-transparent text-white hover:opacity-90`
      : BUTTON_INACTIVE
  }`;

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const isOptSelected = (id: string) => selectedSet.has(id);
  const rowClass = (id: string) =>
    `${ROW_BASE} ${
      isOptSelected(id) ? `${bgAccent} text-white` : ROW_INACTIVE
    }`;

  const buttonText = useMemo(() => {
    if (selectedIds.length === 0) return label;
    if (selectedIds.length === 1) {
      const selectedOption = options.find((o) => o.id === selectedIds[0]);
      return selectedOption ? selectedOption.label : label;
    }
    return `${label} - ${selectedIds.length}`;
  }, [label, options, selectedIds]);

  const toggleId = (id: string) => {
    const isSelected = selectedSet.has(id);
    onChange(
      isSelected ? selectedIds.filter((x) => x !== id) : [...selectedIds, id],
    );
  };

  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    id: string,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleId(id);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div ref={rootRef} className='relative inline-block text-left'>
      <button
        id={buttonId}
        type='button'
        className={buttonClass}
        onClick={onButtonClick}
        aria-haspopup='listbox'
        aria-expanded={open}
        aria-controls={listboxId}
      >
        {buttonText}
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
          aria-multiselectable='true'
          className='absolute left-0 top-full mt-1 w-52 z-50 bg-white rounded-md shadow-lg'
        >
          {options.length > 0 ? (
            <div className='py-1 max-h-60 overflow-y-auto'>
              {options.map((opt) => {
                const selected = isOptSelected(opt.id);
                return (
                  <div
                    key={opt.id}
                    role='option'
                    aria-selected={selected}
                    tabIndex={0}
                    className={rowClass(opt.id)}
                    onClick={() => toggleId(opt.id)}
                    onKeyDown={(e) => handleOptionKeyDown(e, opt.id)}
                  >
                    <div className='flex items-center gap-2'>
                      <span className='relative w-5 h-5 flex-shrink-0'>
                        <input
                          type='checkbox'
                          checked={selected}
                          readOnly
                          tabIndex={-1}
                          role='presentation'
                          className={`peer appearance-none w-5 h-5 border border-gray-300 rounded ${altCheckedBgAccent} checked:border-transparent `}
                        />
                        <FontAwesomeIcon
                          icon={faCheck}
                          className='w-4 h-4 text-white absolute pointer-events-none opacity-0 scale-75 transition-all duration-200 ease-out peer-checked:opacity-100 peer-checked:scale-100 left-0 top-0 m-0.5'
                          aria-hidden='true'
                        />
                      </span>
                      <span className='truncate'>{opt.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='px-3 py-2 text-sm text-gray-500'>
              No options available
            </div>
          )}

          {options.length > 0 && selectedIds.length > 0 && (
            <div className='border-t px-2 py-2'>
              <div className='flex items-center justify-end'>
                <button
                  type='button'
                  className='text-xs underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-[#478143] focus:ring-offset-1'
                  onClick={() => onChange([])}
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
