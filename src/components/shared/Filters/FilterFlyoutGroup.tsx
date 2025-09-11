import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

type InputType = 'checkbox' | 'radio';

interface FilterFlyoutGroupProps {
  label: string;
  options: string[];
  selected: string[];
  type?: InputType;
  name?: string;
  onChange: (value: string) => void;
  bgAccent: string;
  checkedBgAccent?: string;
  borderAccent: string;
}

export const FilterFlyoutGroup: React.FC<FilterFlyoutGroupProps> = ({
  label,
  options,
  selected,
  type = 'checkbox',
  name,
  onChange,
  bgAccent,
  checkedBgAccent,
  borderAccent,
}) => {
  const inputClasses = `
    peer appearance-none w-5 h-5 border bg-white
    ${type === 'radio' ? 'rounded-full' : 'rounded'}
    ${type === 'checkbox' ? checkedBgAccent : ''}
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
    focus-visible:outline-${borderAccent}
  `;

  const isChecked = (option: string) =>
    type === 'checkbox' ? selected.includes(option) : selected[0] === option;

  const getTabIndex = (option: string, index: number) => {
    if (type === 'checkbox') {
      return 0;
    }

    const hasCheckedOption = selected.length > 0;
    if (hasCheckedOption) {
      return isChecked(option) ? 0 : -1;
    } else {
      return index === 0 ? 0 : -1;
    }
  };

  return (
    <div className='mb-6 bg-white rounded-lg border border-gray-200 p-4 shadow-sm'>
      <h3 className='font-bold text-gray-900 mb-3'>{label}</h3>
      <div className='grid grid-cols-2 gap-3'>
        {options.map((option, index) => (
          <label
            key={option}
            className='inline-flex items-center cursor-pointer gap-2'
          >
            <span className='relative w-5 h-5 flex-shrink-0'>
              <input
                type={type}
                name={name}
                value={option}
                checked={isChecked(option)}
                onChange={() => onChange(option)}
                className={inputClasses}
                aria-labelledby={`${name}-${option}`}
                tabIndex={getTabIndex(option, index)}
              />
              {type === 'checkbox' ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  className='w-4 h-4 text-white absolute pointer-events-none opacity-0 scale-75 transition-all duration-200 ease-out peer-checked:opacity-100 left-0 top-0 m-0.5'
                />
              ) : (
                <span
                  className={`absolute inset-0 m-auto w-2.5 h-2.5 rounded-full opacity-0 scale-75 transition-all duration-200 ease-out peer-checked:opacity-100 peer-checked:scale-100 ${bgAccent}`}
                />
              )}
            </span>
            <span
              id={`${name}-${option}`}
              className='text-[13px] leading-snug break-words max-w-[160px] truncate'
              title={option}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
