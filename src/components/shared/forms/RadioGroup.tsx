import React from 'react';

type Option<T extends string> = {
  value: T;
  label: string;
};

type RadioGroupProps<T extends string> = {
  name: string;
  value: T | '';
  onChange: (val: T) => void;
  options: readonly Option<T>[];
  className?: string;
  label?: string;
  error?: string;
};

export const RadioGroup = <T extends string>({
  name,
  value,
  onChange,
  options,
  className = '',
  label,
  error,
}: RadioGroupProps<T>) => (
  <fieldset
    className={className}
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={error ? `${name}-error` : undefined}
  >
    {label && (
      <legend className='block text-sm font-medium text-gray-700 mb-2'>
        {label}
      </legend>
    )}

    <div className='flex flex-wrap gap-3'>
      {options.map((opt) => (
        <label
          key={opt.value}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-md border cursor-pointer transition-all select-none ${
            value === opt.value
              ? 'border-orange-600 bg-orange-50 text-gray-900'
              : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          {/* radio */}
          <span className='relative w-5 h-5 flex-shrink-0'>
            <input
              type='radio'
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className='peer appearance-none w-5 h-5 rounded-full border border-gray-400 outline-none cursor-pointer
                         focus:ring-2 focus:ring-orange-500 focus:ring-offset-1'
            />

            <span className='pointer-events-none absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-orange-600 opacity-0 scale-75 transition-all duration-200 ease-out peer-checked:opacity-100 peer-checked:scale-100' />
          </span>

          <span className='text-sm font-medium'>{opt.label}</span>
        </label>
      ))}
    </div>

    {error && (
      <p id={`${name}-error`} className='mt-1 text-sm text-red-600'>
        {error}
      </p>
    )}
  </fieldset>
);
