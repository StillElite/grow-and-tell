export const toggleArrayValue = (array: string[], value: string) =>
  array.includes(value) ? array.filter((v) => v !== value) : [...array, value];
