export const capitalize = (str: string | undefined | null): string => {
  if (!str || typeof str !== 'string') return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
