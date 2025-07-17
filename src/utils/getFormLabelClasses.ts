export const getFormLabelClasses = (value: string): string => {
  const base =
    'absolute left-4 transition-all duration-200 ease-in-out text-[14px]';
  const float = 'top-1.5 text-orange-700';
  const placeholder =
    'peer-placeholder-shown:top-[1rem] peer-placeholder-shown:text-[17px] peer-placeholder-shown:text-gray-400';
  const focus =
    'peer-focus:top-1.5 peer-focus:text-[14px] peer-focus:text-orange-700';

  return `${base} ${focus} ${
    value ? float : `${placeholder} text-gray-500 top-1.5`
  }`;
};
