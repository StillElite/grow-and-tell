import { SoilTest } from '../types/types';

export const getLatestTest = (tests: SoilTest[]): SoilTest | null => {
  if (tests.length === 0) return null;

  return [...tests].sort(
    (a, b) =>
      new Date(b.dateTested).getTime() - new Date(a.dateTested).getTime(),
  )[0];
};
