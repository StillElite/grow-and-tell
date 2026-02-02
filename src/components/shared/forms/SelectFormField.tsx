import React from 'react';
import { clsx } from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

// Make Option generic over a string union T
export type Option<T extends string = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

interface BaseProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

// Generic props: T is your union, e.g., CompostType
export interface SelectFormFieldProps<
  T extends string = string,
> extends BaseProps {
  /** Controlled value; use "" for “no selection yet” */
  value: T | '';
  onChange: (value: T | '') => void;
  options: Option<T>[]; // Only real choices; no placeholder option needed
}

// Use a generic function component (avoid React.FC to keep generics clean)
export function SelectFormField<T extends string = string>({
  id,
  label,
  value,
  onChange,
  options,
  error,
  required,
  disabled,
}: SelectFormFieldProps<T>) {
  const hasValue = value !== '';

  // Base select styles
  const selectClasses =
    'peer w-full border border-gray-300 rounded-md px-4 pt-6 pb-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2a452c] focus:border-[#2a452c] appearance-none pr-10';

  const labelClasses = clsx(
    'pointer-events-none absolute left-4 top-4 origin-left transition-all duration-150 ease-out text-gray-500 peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:top-4 peer-focus:text-orange-700',
    hasValue && '-translate-y-3 scale-90 top-1.5 text-orange-700',
  );

  return (
    <div className='relative'>
      <select
        id={id}
        value={value} // "" initially
        onChange={(e) => onChange(e.target.value as T | '')}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={clsx(
          selectClasses,
          error && 'border-red-500 focus:ring-red-500',
        )}
      >
        {/* Needed for a truly empty controlled select.
            Disabled + hidden so it's not a "real" option in the list. */}
        <option value='' disabled hidden />

        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>

      {/* Error line to match your FormField layout */}
      <div className='flex justify-between text-xs mt-1'>
        <p
          id={`${id}-error`}
          className={clsx('text-red-600 pl-2 h-4', !error && 'invisible')}
        >
          {error}
        </p>
        <span className='invisible'>.</span>
      </div>

      <span
        aria-hidden='true'
        className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500'
      >
        <FontAwesomeIcon
          icon={faChevronDown}
          className='ml-2 text-[12px] mb-4'
          aria-hidden='true'
        />
      </span>
    </div>
  );
}
