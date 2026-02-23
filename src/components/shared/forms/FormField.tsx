import { clsx } from 'clsx';
import { getFormLabelClasses } from '../../../utils/getFormLabelClasses';

interface FormFieldProps {
  id: string;
  label: string;
  value: string | number | undefined;
  onChange: (value: string) => void;
  error?: string;
  maxLength?: number;
  minLength?: number;
  type?: 'text' | 'textarea' | 'date' | 'number';
  placeholder?: string;
  min?: number | string;
  max?: number | string;
  disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  maxLength,
  minLength,
  type = 'text',
  placeholder = ' ',
  max,
  min,
  disabled = false,
}) => {
  const hasValue = String(value ?? '').length > 0;

  // const inputBaseClasses =
  //   'relative z-0 peer w-full bg-white border border-gray-300 rounded-md p-4 text-base text-gray-900 placeholder-transparent shadow-sm focus:outline-none focus:border-[#2a452c] focus-visible:ring-2 focus-visible:ring-[#2a452c] focus-visible:ring-offset-2 focus-visible:ring-offset-white';

  const inputBaseClasses =
    'relative z-0 peer w-full bg-white border border-gray-300 rounded-md p-4 text-base text-gray-900 placeholder-transparent shadow-sm focus:outline-none focus:border-[#2a452c] focus-visible:ring-2 focus-visible:ring-[#2a452c] focus-visible:ring-offset-2 focus-visible:ring-offset-white appearance-none flex items-center h-[58px]';

  const isEmptyDate = type === 'date' && !String(value ?? '');
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => onChange(e.target.value);

  const sharedProps = {
    id,
    value,
    onChange: handleChange,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-error` : undefined,
    placeholder,
    maxLength,
    disabled,
    className: clsx(
      inputBaseClasses,
      error && 'border-red-500 focus:ring-red-500',
      isEmptyDate && 'date-empty',
    ),
    ...(type === 'date' && {
      max: max || new Date().toISOString().split('T')[0],
      min,
    }),
    ...(type === 'number' && {
      min,
      max,
    }),
    ...(type !== 'number' && { minLength }),
  };

  return (
    <div className='relative group'>
      {type === 'textarea' ? (
        <textarea {...sharedProps} rows={3} />
      ) : (
        <input {...sharedProps} type={type} />
      )}
      <label htmlFor={id} className={getFormLabelClasses(hasValue)}>
        {label}
      </label>
      <div className='flex justify-between text-xs mt-1'>
        <p
          id={`${id}-error`}
          className={clsx('text-red-600 pl-2 h-4', !error && 'invisible')}
        >
          {error}
        </p>
        {maxLength && type !== 'number' && typeof value === 'string' && (
          <p className='text-gray-500'>
            {value.length}/{maxLength}
          </p>
        )}

        {type === 'number' && <p className='text-gray-500 invisible'>0/0</p>}
      </div>
    </div>
  );
};
