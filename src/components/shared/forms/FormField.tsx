import { clsx } from 'clsx';
import { getFormLabelClasses } from '../../../utils/getFormLabelClasses';

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  maxLength?: number;
  type?: 'text' | 'textarea' | 'date';
  placeholder?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  maxLength,
  type = 'text',
  placeholder = ' ',
}) => {
  const inputBaseClasses =
    'peer w-full border border-gray-300 rounded-md px-4 pt-6 pb-2 text-base text-gray-900 placeholder-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2a452c] focus:border-[#2a452c]';

  const maxLengthSpacing = type === 'textarea' ? '-mt-0.5' : 'mt-1';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => onChange(e.target.value);

  const sharedProps = {
    id,
    value,
    onChange: handleChange,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-error` : undefined,
    placeholder,
    maxLength,
    className: clsx(
      inputBaseClasses,
      error && 'border-red-500 focus:ring-red-500'
    ),
  };

  return (
    <div className='relative mb-4'>
      {type === 'textarea' ? (
        <textarea {...sharedProps} rows={3} />
      ) : (
        <input {...sharedProps} type={type} />
      )}
      <label htmlFor={id} className={getFormLabelClasses(value)}>
        {label}
      </label>
      <div className={clsx('flex justify-between text-xs', maxLengthSpacing)}>
        <p
          id={`${id}-error`}
          className={clsx('text-red-600 pl-2', !error && 'invisible')}
        >
          {error}
        </p>
        {maxLength && (
          <p className='text-gray-500'>
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};
