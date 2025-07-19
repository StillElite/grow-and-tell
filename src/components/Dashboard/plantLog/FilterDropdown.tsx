import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { getAccentColor } from '../../../utils/getAccentColor';
import { ViewKey } from '../../../mocks/mockdata';

interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const getOptionClasses = (
  focus: boolean,
  selected: boolean,
  bgAccent: string
) => {
  const base = 'cursor-pointer select-none px-4 py-2 text-sm';
  const focusClass = focus ? `${bgAccent} text-white` : 'text-gray-700';
  const selectedClass = selected ? `font-semibold ${bgAccent} text-white` : '';
  return `${base} ${focusClass} ${selectedClass}`.trim();
};

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const { bgAccent, textAccent, borderAccent } = getAccentColor(
    ViewKey.PlantLog
  );

  const buttonClasses = `w-full rounded-full px-4 py-2 text-sm border transition-colors
  flex justify-between items-center whitespace-nowrap
  ${
    value
      ? `${bgAccent} ${borderAccent} text-white`
      : 'bg-white border-gray-300 text-gray-700'
  }
`;

  const displayLabel = value || label;

  return (
    <div className='relative w-36'>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <ListboxButton className={buttonClasses}>
              {displayLabel}
              <FontAwesomeIcon icon={faChevronDown} className='ml-2 h-3 w-3' />
            </ListboxButton>

            {open && (
              <ListboxOptions className='absolute z-10 mt-1 w-full rounded-md bg-white py-1 shadow-lg border border-gray-200'>
                <ListboxOption
                  key='all'
                  value=''
                  className={({ focus, selected }) =>
                    getOptionClasses(focus, selected, bgAccent)
                  }
                >
                  {({ selected }) => (
                    <div className='flex justify-between items-center'>
                      <span>{label}</span>
                      {selected && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={`h-4 w-4 text-white ${textAccent}`}
                        />
                      )}
                    </div>
                  )}
                </ListboxOption>

                {options.map((option) => (
                  <ListboxOption
                    key={option}
                    value={option}
                    className={({ focus, selected }) =>
                      getOptionClasses(focus, selected, bgAccent)
                    }
                  >
                    {({ selected }) => (
                      <div className='flex justify-between items-center'>
                        <span>{option}</span>
                        {selected && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className={`h-4 w-4 text-white`}
                          />
                        )}
                      </div>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            )}
          </>
        )}
      </Listbox>
    </div>
  );
};
