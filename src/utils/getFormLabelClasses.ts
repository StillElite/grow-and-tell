export const getFormLabelClasses = (hasValue: boolean): string => {
  const base =
    'absolute left-4 transition-all duration-200 ease-in-out pointer-events-none z-20 px-1 leading-5 bg-white';

  const floated = '-top-2 left-4 text-[14px] text-orange-700';

  const inline =
    'top-5 left-4 text-[17px] text-gray-400 peer-focus:-top-2 peer-focus:left-4 peer-focus:text-[14px] peer-focus:text-orange-700 group-focus-within:-top-2 group-focus-within:left-2 group-focus-within:text-[14px] group-focus-within:text-orange-700';

  return `${base} ${hasValue ? floated : inline}`;
};
